import React from 'react';
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "¿Puedo anunciar mi propiedad con otras corredoras?",
    answer:
      "¡Absolutamente! No pedimos exclusividad alguna.",
  },
  {
    question: "¿Cuánto es la comisión de Málaga Propiedades en arriendos?",
    answer:
      "En periodos inferiores a 3 años, corresponde al 50% + iva de un canon de arriendo. En periodos iguales o superiores a 3 años, la comisión corresponde al 2% + iva de la suma de canones del periodo, con un mínimo de un canon + iva.",
  },
  {
    question: "¿Cuánto es la comisión de Málaga Propiedades en ventas?",
    answer:
      "Para ventas, la comisión corresponde al 2% + iva del valor final pactado.",
  },
  {
    question: "¿Cuándo debo pagar la comisión de Málaga Propiedades?",
    answer:
      "La comisión se paga contra éxito, es decir al momento de la firma.",
  },
  // More questions...
]

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">¿Tienes dudas?</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
