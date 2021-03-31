import React from "react"

export default function Subscriber({ substackUrl }) {
  return (
    <section className="subscriber">
      <h4>Bildirim Almak İster Misin?</h4>
      <p>
        Yeni eklenen içeriklerden bildirim almak istiyorsan tek yapman gereken
        butona tıkla ve mailini bırak. Sana düzenli olarak mail göndereceğim.
      </p>
      <a href={substackUrl} target="_blank" rel="noreferrer">
        Abone Ol
      </a>
    </section>
  )
}
