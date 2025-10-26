import StyledComponentsRegistry from '@lib/StyledComponentsRegistry';
import Providers from './providers';

export const metadata = {
  title: 'Markdown ↔ Texto | Editor com Preview',
  description: 'Escreva Markdown em uma aba e visualize o resultado na outra.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
