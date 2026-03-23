import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface DevisItem {
  description: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const devis = await prisma.devis.findUnique({
    where: { id },
  });

  if (!devis) {
    return NextResponse.json({ error: "Devis non trouvé" }, { status: 404 });
  }

  const items = devis.items as unknown as DevisItem[];

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

  const tvaAmount = (devis.sousTotal * devis.tva) / 100;

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Devis ${devis.numero}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #E85D04; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #003049; }
    .logo span { color: #E85D04; }
    .company-info { text-align: right; font-size: 12px; color: #666; }
    .document-title { text-align: center; margin-bottom: 30px; }
    .document-title h1 { font-size: 28px; color: #003049; margin-bottom: 5px; }
    .document-title .numero { font-size: 16px; color: #E85D04; font-weight: 600; }
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
    .notes { margin-top: 40px; padding: 20px; background: #fff8f0; border-left: 4px solid #E85D04; border-radius: 4px; }
    .notes h3 { font-size: 14px; color: #E85D04; margin-bottom: 10px; }
    .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
    .validity { display: inline-block; background: #E85D04; color: white; padding: 8px 20px; border-radius: 20px; font-weight: 600; margin-top: 20px; }
    @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="logo">IDEATYS <span>Digital</span></div>
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
      <h1>DEVIS</h1>
      <div class="numero">${devis.numero}</div>
    </div>

    <div class="info-grid">
      <div class="info-box">
        <h3>Client</h3>
        <p class="name">${devis.clientNom}</p>
        ${devis.clientEntreprise ? `<p>${devis.clientEntreprise}</p>` : ""}
        ${devis.clientAdresse ? `<p>${devis.clientAdresse}</p>` : ""}
        <p>${devis.clientEmail}</p>
        ${devis.clientTel ? `<p>${devis.clientTel}</p>` : ""}
      </div>
      <div class="info-box">
        <h3>Informations</h3>
        <p><strong>Date :</strong> ${formatDate(devis.createdAt)}</p>
        <p><strong>Validité :</strong> ${formatDate(devis.validite)}</p>
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
          <span>${formatCurrency(devis.sousTotal)}</span>
        </div>
        ${devis.tva > 0 ? `
          <div class="totals-row">
            <span>TVA (${devis.tva}%)</span>
            <span>${formatCurrency(tvaAmount)}</span>
          </div>
        ` : ""}
        <div class="totals-row total">
          <span>Total TTC</span>
          <span>${formatCurrency(devis.total)}</span>
        </div>
      </div>
    </div>

    ${devis.notes ? `
      <div class="notes">
        <h3>Notes & Conditions</h3>
        <p>${devis.notes}</p>
      </div>
    ` : ""}

    <div style="text-align: center;">
      <div class="validity">Valide jusqu'au ${formatDate(devis.validite)}</div>
    </div>

    <div class="footer">
      <p>IDEATYS Digital - Agence Digitale au Sénégal</p>
      <p>Ce devis est valable jusqu'à la date indiquée. Passé ce délai, les prix peuvent être révisés.</p>
    </div>
  </div>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="devis-${devis.numero}.html"`,
    },
  });
}
