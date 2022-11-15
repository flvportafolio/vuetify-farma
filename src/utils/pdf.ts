function downloadPdf(data: any, nombre: string) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${nombre}.pdf`);
  link.click();
}
function openPdfNewTab(data: any) {
  const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
  window.open(url, '_blank');
}

export {
  downloadPdf,
  openPdfNewTab,
};
