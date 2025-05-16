import React, { useEffect, useRef, useState } from 'react';
import { LanyardResponse } from '../types/lanyard';
import ProfileCard from './ProfileCard';

interface CardCarouselProps {
  data: LanyardResponse[];
  isRevealed: boolean;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ data, isRevealed }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;

    let animationId: number;
    const speed = 5.0; // pixels per frame

    // Função de animação
    const animate = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const cards = Array.from(container.children) as HTMLElement[];

      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        // Movendo o card para a esquerda
        const currentPosition = parseFloat(card.dataset.position || '0');
        const newPosition = currentPosition - speed;
        card.style.transform = `translateX(${newPosition}px)`;
        card.dataset.position = newPosition.toString();

        // Se o card sair da tela à esquerda, reposiciona à direita
        if (newPosition < -card.offsetWidth) {
          // Move o card para o final da fila (fora da tela, à direita)
          card.dataset.position = `${container.offsetWidth}`; // Definindo o posicionamento à direita
          card.style.transform = `translateX(${container.offsetWidth}px)`;
        }
      });

      setAnimating(true);
      animationId = requestAnimationFrame(animate);
    };

    // Inicializar as posições
    const initPositions = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const cards = Array.from(container.children) as HTMLElement[];

      if (cards.length === 0) return;

      // Posicionando os cards à direita do contêiner inicialmente
      cards.forEach((card, index) => {
        const initialPosition = container.offsetWidth + index * (card.offsetWidth + 20); // Posição inicial com o espaço entre os cards
        card.dataset.position = initialPosition.toString();
        card.style.transform = `translateX(${initialPosition}px)`;
      });

      // Iniciar a animação
      animationId = requestAnimationFrame(animate);
    };

    // Inicializando depois de um pequeno delay para garantir o carregamento
    const timeout = setTimeout(initPositions, 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationId);
      setAnimating(false);
    };
  }, [isRevealed]);

  if (!isRevealed) return null;

  return (
    <div
      ref={containerRef}
      className="relative h-96 w-full overflow-hidden"
      style={{ minHeight: '400px' }}
    >
      {data.map((item, index) => (
        item.success && (
          <div key={index} className="absolute">
            <ProfileCard data={item.data} isAnimating={animating} />
          </div>
        )
      ))}
    </div>
  );
};

export default CardCarousel;
