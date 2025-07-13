# Logica operativa e flusso della supply chain

Il contratto modella una supply chain con i seguenti passaggi:
  ## Registrazione del prodotto:
    - Un utente (es. un produttore) chiama registerProduct per aggiungere un prodotto, che inizia nello stato Produced.
    - Il prodotto viene automaticamente contrassegnato come isTrustful se il suo nome è presente in trustfulProducts.
  
  ## Aggiornamento dello stato:
      - Il proprietario del prodotto può usare updateProductState per avanzare lo stato (es. da Produced a Distributed).
      - Ogni cambio di stato viene registrato in productHistories.

  ## Trasferimento di proprietà:
      - transferOwnership consente di trasferire la proprietà senza cambiare lo stato.
      - transfer trasferisce la proprietà e imposta lo stato a Distributed.

  ## Acquisto:
      - purchase consente a un consumatore di acquistare un prodotto, impostando lo stato a Sold e trasferendo la proprietà.

  ## Gestione amministrativa:
      - Il proprietario del contratto gestisce le liste di origini locali (localOrigins) e prodotti affidabili (trustfulProducts).
      - Queste liste influenzano le funzioni isProductLocal e isInformationTrustful.

  ## Tracciamento:
      - La cronologia di ogni prodotto è memorizzata in productHistories, consentendo di tracciare ogni cambio di stato o proprietario.
      - Le funzioni di lettura permettono di verificare lo stato attuale, la cronologia, e le proprietà di affidabilità e localizzazione.

