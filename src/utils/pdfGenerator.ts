import jsPDF from 'jspdf';
import type { GeneratedName } from '../types';

export const exportToPDF = async (names: GeneratedName[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const contentWidth = pageWidth - (margin * 2);

  // Couleurs professionnelles
  const primaryColor = [30, 64, 175]; // Bleu royal
  const secondaryColor = [100, 116, 139]; // Gris bleuté
  const lightColor = [241, 245, 249]; // Gris très clair

  try {
    const logoUrl = window.location.origin + '/logo.png';
    doc.addImage(logoUrl, 'PNG', margin, 20, 35, 35);
  } catch (error) {
    // Continuer sans logo si non disponible
  }

  // En-tête avec cadre élégant
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, 60, pageWidth - margin, 60);

  // Titre principal
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('PROPOSITIONS DE NOMS', pageWidth / 2, 70, { align: 'center' });

  // Sous-titre
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Sélection pour votre projet startup', pageWidth / 2, 78, { align: 'center' });

  // Informations du document
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Généré le ${dateStr}`, margin, 90);
  doc.text(`Référence : STP-${Date.now().toString().slice(-6)}`, pageWidth - margin, 90, { align: 'right' });

  let y = 105;
  let pageNum = 1;

  names.forEach((name, index) => {
    // Nouvelle page si nécessaire
    if (y > 240) {
      doc.addPage();
      pageNum++;
      y = margin + 10;
    }

    // Fond alterné pour les lignes
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 8, contentWidth, 32, 'F');
    }

    // Numéro en cercle élégant
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(margin + 8, y + 2, 6, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text((index + 1).toString(), margin + 6.5, y + 4.5);

    // Nom de la startup
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(name.name, margin + 25, y + 5);

    // Baseline (description)
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    
    // Ajuster la baseline pour tenir sur une ligne
    let baseline = name.baseline;
    if (baseline.length > 60) {
      baseline = baseline.substring(0, 60) + '...';
    }
    doc.text(`"${baseline}"`, margin + 25, y + 12);

    // Suggestions de domaines
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Variantes disponibles :', margin + 25, y + 20);
    
    // Générer des suggestions de domaines
    const cleanName = name.name.toLowerCase().replace(/\s+/g, '');
    let shortName = cleanName;
    
    // Raccourcir si trop long
    if (cleanName.length > 12) {
      shortName = cleanName.substring(0, 12);
    }
    
    // Suggestions optimales (2-3 seulement)
    const domainSuggestions = [
      `${shortName}.io`,
      `${shortName}.app`,
      `get${shortName.substring(0, 8)}.com`
    ];
    
    // Afficher les suggestions
    let xDomain = margin + 70;
    domainSuggestions.slice(0, 2).forEach((domain) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(59, 130, 246);
      doc.text(domain, xDomain, y + 20);
      xDomain += 35;
    });
    
    // Troisième suggestion sur ligne suivante si nécessaire
    if (domainSuggestions.length > 2 && shortName.length <= 8) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(59, 130, 246);
      doc.text(domainSuggestions[2], margin + 70, y + 25);
    }

    // Ligne de séparation
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 30, pageWidth - margin, y + 30);

    y += 38;
  });

  // Section d'informations
// ... (le code reste le même jusqu'à la section d'informations)

  // Section d'informations - CORRIGÉ
  const infoY = Math.min(y + 15, pageHeight - 50);
  
  // D'abord dessiner le cadre
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, infoY, contentWidth, 25, 3, 3, 'S');
  
  // Puis le fond
  doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
  doc.roundedRect(margin, infoY, contentWidth, 25, 3, 3, 'F');

  // Titre - DÉPLACÉ PLUS HAUT DANS LE CADRE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('INFORMATIONS IMPORTANTES', margin + 10, infoY + 7); // ← 7 au lieu de 8

  // Contenu - BIEN CENTRÉ DANS LE CADRE
  const totalCount = names.length;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(`${totalCount} propositions générées`, margin + 10, infoY + 14); // ← 14 au lieu de 16
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Vérifier la disponibilité réelle des domaines', margin + 10, infoY + 20); // ← 20 au lieu de 22

  // Pied de page - CORRIGÉ POUR ÊTRE EN DEHORS DU CADRE
  const footerY = infoY + 35; // ← PLUS BAS QUE LE CADRE

  // Informations société - EN DEHORS DU CADRE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Startup-dev', margin + 10, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Générateur de noms startup', margin + 10, footerY + 6);

   doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  const currentYear = new Date().getFullYear();
  doc.text(`© ${currentYear} Startup-dev`, pageWidth - margin, footerY + 2, { align: 'right' });

  // Signature - REMONTÉE et avec PLUS D'ESPACE
  const signatureY = footerY + 12; // ← CHANGEMENT ICI : de footerY + 15 à footerY + 12
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Document généré par Startup-dev - inspirez-vous librement', pageWidth / 2, signatureY, { align: 'center' });
// ... (le reste du code)
  // Sauvegarde
  const formattedDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
  doc.save(`Propositions-Noms-${formattedDate}.pdf`);
};