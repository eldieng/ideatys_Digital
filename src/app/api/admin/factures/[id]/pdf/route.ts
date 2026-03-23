import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface FactureItem {
  description: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

const statusLabels: Record<string, string> = {
  EN_ATTENTE: "En attente de paiement",
  PAYEE: "Payée",
  PARTIELLEMENT_PAYEE: "Partiellement payée",
  EN_RETARD: "En retard",
  ANNULEE: "Annulée",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const facture = await prisma.facture.findUnique({
    where: { id },
  });

  if (!facture) {
    return NextResponse.json({ error: "Facture non trouvée" }, { status: 404 });
  }

  const items = facture.items as unknown as FactureItem[];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(amount) + " FCFA";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const tvaAmount = (facture.sousTotal * facture.tva) / 100;
  const statusColor = facture.status === "PAYEE" ? "#22c55e" : facture.status === "EN_RETARD" ? "#ef4444" : "#E85D04";
  const baseUrl = process.env.NEXTAUTH_URL || "https://ideatysdigital.com";

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Facture ${facture.numero}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px; }
    .print-bar { background: #003049; color: white; padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0; }
    .print-bar h2 { font-size: 16px; font-weight: 500; }
    .print-btn { background: #E85D04; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
    .print-btn:hover { background: #d14d00; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #003049; padding-bottom: 20px; }
    .logo-img { height: 50px; width: auto; }
    .company-info { text-align: right; font-size: 12px; color: #666; }
    .document-title { text-align: center; margin-bottom: 30px; }
    .document-title h1 { font-size: 28px; color: #003049; margin-bottom: 5px; }
    .document-title .numero { font-size: 16px; color: #E85D04; font-weight: 600; }
    .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; color: white; background: ${statusColor}; margin-top: 10px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
    .info-box { background: #f8f9fa; padding: 20px; border-radius: 8px; }
    .info-box h3 { font-size: 12px; text-transform: uppercase; color: #666; margin-bottom: 10px; letter-spacing: 1px; }
    .info-box p { margin-bottom: 5px; }
    .info-box .name { font-size: 16px; font-weight: 600; color: #003049; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #003049; color: white; padding: 12px 15px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    th:last-child, td:last-child { text-align: right; }
    td { padding: 15px; border-bottom: 1px solid #eee; }
    tr:nth-child(even) { background: #f8f9fa; }
    .totals { display: flex; justify-content: flex-end; }
    .totals-box { width: 300px; }
    .totals-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .totals-row.total { border-bottom: none; border-top: 2px solid #003049; font-size: 18px; font-weight: bold; color: #003049; padding-top: 15px; }
    .notes { margin-top: 40px; padding: 20px; background: #f0f9ff; border-left: 4px solid #003049; border-radius: 4px; }
    .notes h3 { font-size: 14px; color: #003049; margin-bottom: 10px; }
    .payment-info { margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    .payment-info h3 { font-size: 14px; color: #003049; margin-bottom: 10px; }
    .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
    .echeance { display: inline-block; background: #003049; color: white; padding: 8px 20px; border-radius: 20px; font-weight: 600; margin-top: 20px; }
    @media print { 
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .print-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <h2>Facture ${facture.numero} - Aperçu</h2>
    <button class="print-btn" onclick="window.print()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Télécharger PDF
    </button>
  </div>
  <div class="container">
    <div class="header">
      <div>
        <img src="${baseUrl}/img/ideatysdigital_logo_sans_fond.png" alt="IDEATYS Digital" class="logo-img" />
        <p style="margin-top: 10px; color: #666;">Agence Digitale au Sénégal</p>
      </div>
      <div class="company-info">
        <p><strong>IDEATYS Digital</strong></p>
        <p>Dakar, Sénégal</p>
        <p>+221 78 608 70 14</p>
        <p>ideatysdigital@gmail.com</p>
      </div>
    </div>

    <div class="document-title">
      <h1>FACTURE</h1>
      <div class="numero">${facture.numero}</div>
      <div class="status-badge">${statusLabels[facture.status]}</div>
    </div>

    <div class="info-grid">
      <div class="info-box">
        <h3>Facturé à</h3>
        <p class="name">${facture.clientNom}</p>
        ${facture.clientEntreprise ? `<p>${facture.clientEntreprise}</p>` : ""}
        ${facture.clientAdresse ? `<p>${facture.clientAdresse}</p>` : ""}
        <p>${facture.clientEmail}</p>
        ${facture.clientTel ? `<p>${facture.clientTel}</p>` : ""}
      </div>
      <div class="info-box">
        <h3>Informations</h3>
        <p><strong>Date d'émission :</strong> ${formatDate(facture.createdAt)}</p>
        <p><strong>Date d'échéance :</strong> ${formatDate(facture.echeance)}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 50%;">Description</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => `
          <tr>
            <td>${item.description}</td>
            <td>${item.quantite}</td>
            <td>${formatCurrency(item.prixUnitaire)}</td>
            <td>${formatCurrency(item.total)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="totals">
      <div class="totals-box">
        <div class="totals-row">
          <span>Sous-total</span>
          <span>${formatCurrency(facture.sousTotal)}</span>
        </div>
        ${facture.tva > 0 ? `
          <div class="totals-row">
            <span>TVA (${facture.tva}%)</span>
            <span>${formatCurrency(tvaAmount)}</span>
          </div>
        ` : ""}
        <div class="totals-row total">
          <span>Total à payer</span>
          <span>${formatCurrency(facture.total)}</span>
        </div>
      </div>
    </div>

    <div class="payment-info">
      <h3>Informations de paiement</h3>
      <p>Merci de régler cette facture avant la date d'échéance indiquée.</p>
      <p>Pour tout renseignement, contactez-nous à ideatysdigital@gmail.com</p>
    </div>

    ${facture.notes ? `
      <div class="notes">
        <h3>Notes</h3>
        <p>${facture.notes}</p>
      </div>
    ` : ""}

    <div style="text-align: center;">
      <div class="echeance">Échéance : ${formatDate(facture.echeance)}</div>
    </div>

    <div class="footer">
      <p>IDEATYS Digital - Agence Digitale au Sénégal</p>
      <p>Merci pour votre confiance.</p>
    </div>
  </div>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="facture-${facture.numero}.html"`,
    },
  });
}
