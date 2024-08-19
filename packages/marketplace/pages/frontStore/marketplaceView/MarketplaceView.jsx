import React from 'react';
import './MarketplaceView.scss';

export default function MarketplaceView() {
  return (
    <div className="marketplace-container">
      <div className="grid">
        <div className="col-text">
          <div>
            <section>
              <span className="title-part1">Conectando el</span>
              <div className="title-part2">corazón de la región</div>
              <p className="description">
                Nuestro marketplace es el puente que une a los negocios rurales
                con el mundo digital. Ofrecemos una plataforma donde productores
                locales, artesanos y emprendedores pueden vender sus productos y
                servicios, alcanzando nuevos mercados y fortaleciendo la
                economía de la región. Apoyamos el crecimiento sostenible, la
                autenticidad y la calidad que solo el campo puede ofrecer.
              </p>
            </section>
            <div className="linkTo">
              <a routerLink="auth">Accede</a>
            </div>
          </div>
        </div>
        <div className="col-image">
          <img src="/image1.webp" alt="Imagen" className="image" />
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
