import { useEffect } from 'react';

const useBlockCopy = () => {
  useEffect(() => {
    // Bloqueia o F12
    const blockF12 = (e) => {
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    // Bloqueia Ctrl + C
    const blockCtrlC = (e) => {
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
      }
    };

    // Bloqueia Ctrl + V
    const blockCtrlV = (e) => {
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
      }
    };

    // Bloqueia o botão direito do mouse
    const blockRightClick = (e) => {
      e.preventDefault();
    };

    // Adiciona os event listeners
    document.addEventListener('keydown', blockF12);
    document.addEventListener('keydown', blockCtrlC);
    document.addEventListener('keydown', blockCtrlV);
    document.addEventListener('contextmenu', blockRightClick);

    // Remove os event listeners quando o componente for desmontado
    return () => {
      document.removeEventListener('keydown', blockF12);
      document.removeEventListener('keydown', blockCtrlC);
      document.removeEventListener('keydown', blockCtrlV);
      document.removeEventListener('contextmenu', blockRightClick);
    };
  }, []);
};

export default useBlockCopy;
