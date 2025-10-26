import { GlobalStyle, Shell, Brand } from '@/styles/globals';
import MainLayout from '@/src/templates/MainLayout';


export default function App(){
return (
<Shell>
<GlobalStyle />
<header style={{ display:'none' }}>
<Brand><span className="logo">M↓</span> Markdown Transcriber</Brand>
</header>
<MainLayout />
</Shell>
);
}