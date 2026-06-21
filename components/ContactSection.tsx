"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, Github, ArrowUpRight, Copy, Terminal, MessageSquarePlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input as CustomInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactEmail = "lqlp0011@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          (data && typeof data === "object" && "error" in data && typeof data.error === "string" && data.error) ||
          "Failed to deliver your message. Please try again later.";
        throw new Error(message);
      }

      setFormSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to deliver your message. Please try again later."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 py-4 text-left font-sans" id="contact-section-container">
      {/* Left Column: Social Links & Availability info */}
      <div className="space-y-6 flex flex-col justify-between" id="contact-left-block">
        <div className="space-y-4">
          <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 dark:bg-indigo-400/5 border border-indigo-500/10 text-xs font-mono font-medium inline-block">
            Let's Collaborate
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans">
            Have a project in mind or just looking to chat for help?
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
            Drop me a note, or click the copy shortcut to send a direct message.
          </p>
        </div>

        {/* Contact shortcuts Card */}
        <div className="space-y-4" id="direct-collaborate-links">
          <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
            Direct Routing
          </h3>

          <div className="space-y-2">
            {/* Email copying widget */}
            <div
              className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-all cursor-pointer group"
              onClick={handleCopyEmail}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  <Mail className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 leading-none mb-0.5">Copy Email</p>
                  <p className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 select-all">
                    {contactEmail}
                  </p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                {copied ? <span className="text-[10px] font-mono text-indigo-600 font-bold">Copied!</span> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            {/* GitHub handle */}
            <a
              href="https://github.com/thescapeplayground/shenanigans"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  <Github className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 leading-none mb-0.5">GitHub Repository</p>
                  <p className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                    thescapeplayground
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Contact form with AnimatePresence toast */}
      <div
        className="p-6 sm:p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/30 backdrop-blur-sm shadow-sm relative overflow-hidden"
        id="contact-form-pane"
      >
        <AnimatePresence mode="wait">
          {!formSubmitted ? (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSendMessage}
              className="space-y-4"
              id="collaborate-direct-form"
            >
              <div>
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono block mb-1">
                  How should I call you? *
                </label>
                <CustomInput
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Robin"
                  className="rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 h-10 text-sm font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono block mb-1">
                  Your return address *
                </label>
                <CustomInput
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. robin@domain.com"
                  className="rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 h-10 text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono block mb-1">
                  Tell me about your idea *
                </label>
                <Textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I'm planning to launch an electronic project..."
                  className="rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 text-sm font-sans h-28 resize-none"
                />
              </div>

              {errorMessage && (
                <p className="text-xs font-mono text-red-600 dark:text-red-400 leading-relaxed" role="alert">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 h-10 gap-2 shrink-0 rounded-lg active:scale-95 transition-all mt-2"
                id="contact-send-btn"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>{sending ? "Delivering Note..." : "Deliver Note"}</span>
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="contact-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              id="message-sent-screen"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200/50 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 font-mono">
                  Note Delivered!
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs font-sans leading-relaxed">
                  Your message has been queued successfully. I will get back to your return address as soon as possible.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setFormSubmitted(false)}
                className="rounded-full h-8 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 border-zinc-200 dark:border-zinc-800"
                id="contact-another-form-btn"
              >
                Send Another Message
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default ContactSection;