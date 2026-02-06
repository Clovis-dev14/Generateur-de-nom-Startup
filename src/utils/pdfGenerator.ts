import jsPDF from 'jspdf';
import type { GeneratedName } from '../types';

export const exportToPDF = (names: GeneratedName[]) => {
  const doc = new jsPDF();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 107, 53);
  doc.text('Liste de Noms de Startup', 20, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(107, 107, 107);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 20, 28);

  let y = 45;

  names.forEach((name, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(26, 26, 26);
    doc.text(`${index + 1}. ${name.name}`, 20, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(107, 107, 107);
    doc.text(name.baseline, 20, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Domaines :', 20, y + 14);

    let xDomain = 45;
    Object.entries(name.domains).forEach(([ext, available]) => {
      doc.setTextColor(available ? 6 : 214, available ? 167 : 64, available ? 125 : 69);
      doc.text(`${ext} ${available ? '✓' : '✗'}`, xDomain, y + 14);
      xDomain += 20;
    });

    doc.setTextColor(107, 107, 107);
    doc.text('Réseaux :', 20, y + 20);

    let xSocial = 45;
    Object.entries(name.socials).forEach(([platform, available]) => {
      doc.setTextColor(available ? 6 : 214, available ? 167 : 64, available ? 125 : 69);
      doc.text(`${platform} ${available ? '✓' : '✗'}`, xSocial, y + 20);
      xSocial += 25;
    });

    doc.setDrawColor(224, 221, 217);
    doc.line(20, y + 26, 190, y + 26);

    y += 35;
  });

  doc.save(`startup-names-${Date.now()}.pdf`);
};
