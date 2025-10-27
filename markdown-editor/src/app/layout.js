import StyledComponentsRegistry from "./styled-registry";
import GlobalStyle from "./global-styles";


export const metadata = {
title: "A4 Editor | Next.js",
description: "Editor WYSIWYG com paginação A4 em tela (Atomic + styled-components)"
};


export default function RootLayout({ children }) {
return (
<html lang="pt-BR">
<body>
<StyledComponentsRegistry>
<GlobalStyle />
{children}
</StyledComponentsRegistry>
</body>
</html>
);
}