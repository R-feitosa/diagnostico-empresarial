
"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, MessageSquare, Send, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { INITIAL_NAME_QUESTION, INITIAL_QUESTION, Question } from "@/lib/questions";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isMarkdown?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(INITIAL_NAME_QUESTION);
  const [businessStage, setBusinessStage] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [report, setReport] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensagem inicial - pergunta do nome
    setMessages([
      {
        role: "assistant",
        content: INITIAL_NAME_QUESTION.text,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleOptionClick = async (value: string, label: string) => {
    if (isLoading) return;

    // Limpar o input imediatamente
    setInputValue("");

    // Mostrar o label bonito para o usuário
    const newUserMessage: Message = {
      role: "user",
      content: label,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Mas enviar o value para a API
    await processMessage(value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Adicionar mensagem do usuário
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    await processMessage(userMessage);
  };

  const processMessage = async (userMessage: string) => {
    setIsLoading(true);

    try {
      // Salvar resposta ANTES de enviar para API
      let updatedAnswers = { ...answers };
      let updatedBusinessStage = businessStage;
      let currentQuestionId = currentQuestion?.id || "";

      if (currentQuestion) {
        if (currentQuestion.id === "business_stage") {
          updatedBusinessStage = userMessage.toLowerCase().includes("iniciando")
            ? "iniciando"
            : "melhorando";
          setBusinessStage(updatedBusinessStage);
        } else {
          // IMPORTANTE: Salvar a resposta atual ANTES de enviar para API
          updatedAnswers[currentQuestion.id] = userMessage;
          setAnswers(updatedAnswers);
          console.log(`Resposta salva para ${currentQuestion.id}: ${userMessage}`);
          console.log(`Total de respostas até agora: ${Object.keys(updatedAnswers).length}`);
        }
      }

      // Fazer requisição para API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
          currentAnswers: updatedAnswers,
          businessStage: updatedBusinessStage,
          currentQuestionId: currentQuestionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Resposta da API:', {
        isComplete: data.isComplete,
        hasReport: !!data.report,
        hasError: !!data.error,
        responseLength: data.response?.length || 0
      });

      // Verificar se a resposta está vazia (mas não se for um erro que retorna mensagem)
      if (!data.response || data.response.trim() === "") {
        console.error("❌ Resposta vazia da API!");
        const errorMessage: Message = {
          role: "assistant",
          content: "Houve um erro ao processar sua resposta. Verificando o progresso...",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }

      // Adicionar resposta do assistente
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        isMarkdown: data.isComplete, // Se é relatório, marcar como markdown
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      console.log(`✅ Mensagem adicionada ao chat (${data.response.length} caracteres)`);

      if (data.isComplete) {
        setIsComplete(true);
        setReport(data.report);
        setCurrentQuestion(null);
        
        // Adicionar mensagem de sucesso sobre o envio do email
        setTimeout(() => {
          const emailSuccessMessage: Message = {
            role: "assistant",
            content: "✅ **Relatório enviado com sucesso!**\n\nSeu diagnóstico completo foi enviado para o email cadastrado. Nossa equipe comercial entrará em contato em breve pelo WhatsApp informado.\n\nVocê também pode baixar o relatório clicando no botão acima.",
            timestamp: new Date(),
            isMarkdown: true,
          };
          setMessages((prev) => [...prev, emailSuccessMessage]);
        }, 1000);
      } else {
        setCurrentQuestion(data.question);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Desculpe, ocorreu um erro. Por favor, tente novamente.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const downloadReport = async () => {
    try {
      setIsLoading(true);
      
      // Buscar o nome da empresa e nome do usuário das respostas
      const businessName = answers.business_name || 'Empresa';
      const userName = answers.user_name || 'Usuario';
      
      // Fazer chamada para gerar o PDF
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportMarkdown: report,
          userName: userName,
          businessName: businessName,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar PDF");
      }

      // Baixar o PDF
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Diagnostico_${businessName.replace(/\s+/g, '_')}_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar relatório:", error);
      alert("Erro ao baixar o relatório. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-4"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para página inicial
          </Link>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Diagnóstico Empresarial
              </h1>
              <p className="text-gray-100 text-lg">
                {isComplete
                  ? "Diagnóstico Completo - Fase 1"
                  : "Responda às perguntas do nosso agente especializado"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-primary/10">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-secondary font-semibold">
                    {isComplete
                      ? "Diagnóstico Finalizado"
                      : "Agente Ativo - Fase 1: Diagnóstico Gratuito"}
                  </span>
                </div>
                {isComplete && (
                  <button
                    onClick={downloadReport}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Relatório
                  </button>
                )}
              </div>
            </div>

            {/* Área de mensagens */}
            <div className="h-[600px] overflow-y-auto p-6 space-y-4 bg-gray-50">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words">
                        {message.isMarkdown ? (
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-primary mb-4 mt-4" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-secondary mb-3 mt-3" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-primary mb-2 mt-2" {...props} />,
                                h4: ({node, ...props}) => <h4 className="text-base font-bold text-gray-800 mb-2 mt-2" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                                p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold text-secondary" {...props} />,
                                hr: ({node, ...props}) => <hr className="my-4 border-gray-300" {...props} />,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                      <div
                        className={`text-xs mt-2 ${
                          message.role === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 border border-gray-200 shadow-sm rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analisando...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Área de input */}
            {!isComplete && (
              <div className="border-t border-gray-200 p-4 bg-white">
                {currentQuestion?.options && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          // Enviar diretamente sem modificar o input
                          if (!isLoading) {
                            handleOptionClick(option.value, option.label);
                          }
                        }}
                        className="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors border border-primary/20"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type={currentQuestion?.type === "email" ? "email" : currentQuestion?.type === "tel" ? "tel" : "text"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      currentQuestion?.type === "email"
                        ? "seu@email.com"
                        : currentQuestion?.type === "tel"
                        ? "(11) 99999-9999"
                        : "Digite sua resposta..."
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                  >
                    <Send className="w-5 h-5" />
                    Enviar
                  </button>
                </div>
              </div>
            )}
          </div>

          {!isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 bg-primary/5 border-l-4 border-primary p-6 rounded"
            >
              <h3 className="text-lg font-bold text-secondary mb-3">
                📋 Informações Importantes:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>
                    Responda com sinceridade para obter um diagnóstico preciso e
                    personalizado
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>
                    O processo completo da Fase 1 leva aproximadamente 15-20
                    minutos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>
                    Todas as informações são confidenciais e protegidas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>
                    Ao final, você receberá um relatório completo com insights e
                    recomendações
                  </span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
