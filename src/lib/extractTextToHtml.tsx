export default function extractTextWithIndentation(html: any) {
  // Create a temporary DOM element to parse the HTML string
  const tempDiv = typeof window !== 'undefined' && document.createElement('div');
  tempDiv.innerHTML = html;

  // Function to traverse the nodes recursively and extract text
  function traverse(node, depth) {
      let text = '';
      if (node.nodeType === Node.TEXT_NODE) {
          text += node.nodeValue.trim();
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          const children = Array.from(node.childNodes);
          children.forEach(child => {
              text += traverse(child, depth + 1);
          });
          if (node.nodeName === 'P' || node.nodeName === 'H2' || node.nodeName === 'H3' || node.nodeName === 'UL' || node.nodeName === 'LI') {
              text = '\n' + ' '.repeat(depth * 2) + text.trim();
          }
      }
      return text;
  }

  // Start traversing from the root element
  return traverse(tempDiv, 0).trim();
}