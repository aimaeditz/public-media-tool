import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../../lib/tools-data';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const activeTestimonial = TESTIMONIALS[current];

  return (
    <section className="py-20 bg-slate-50/80 border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            User Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mt-2">
            What Users Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 space-y-6">
          <Quote className="w-12 h-12 text-indigo-200 mx-auto" />

          {/* Stars */}
          <div className="flex justify-center gap-1">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>

          <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed font-serif max-w-2xl mx-auto">
            "{activeTestimonial.quote}"
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <img
              src={activeTestimonial.avatar}
              alt={activeTestimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
            />
            <div className="text-left">
              <p className="font-heading font-bold text-slate-900 text-sm">{activeTestimonial.name}</p>
              <p className="text-xs text-slate-500">{activeTestimonial.role}</p>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center items-center gap-4 pt-6">
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'w-8 bg-indigo-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
