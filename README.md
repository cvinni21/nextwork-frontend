# NextWork – Portal de Vagas (Front-End)

NextWork é uma aplicação **Front-End** desenvolvida como projeto da disciplina **Back-End Frameworks**, do curso de **Análise e Desenvolvimento de Sistemas (ADS)**.  
O docente da disciplina definiu como tema a criação de um **portal de vagas de emprego**, e este repositório contém a implementação da interface utilizando **Next.js**.

A proposta do NextWork é oferecer uma experiência simples e intuitiva para busca de vagas, cadastro de usuários, edição de perfis e upload de currículos em PDF.

## 🚀 Tecnologias Utilizadas

### **Base do Projeto**
- **Next.js 15**
- **React 19**
- **Tailwind CSS 4** (sem PostCSS)
- **Axios**
- **React Hook Form**
- **JWT Decode**
- **Next Themes**

### **Componentes e UI**
- **Radix UI** (Dialog, Select, Tabs, Checkbox, Menubar etc.)
- **Lucide React**
- **Framer Motion**
- **cmdk**
- **Sonner**
- **Tailwind Merge**

### **Interações e Utilidades**
- **Embla Carousel**
- **React Dropzone**
- **@react-pdf/renderer**
- **country-state-city**
- **br_states**

### **Ferramentas de Desenvolvimento**
- **ESLint**
- **Autoprefixer**
- **TailwindCSS v4**

## 📌 Funcionalidades Implementadas

✔️ Cadastro e login de usuários  
✔️ Autenticação via token JWT  
✔️ Edição completa de perfil (foto, nome, habilidades, curso etc.)  
✔️ Upload e visualização de currículo em PDF  
✔️ Listagem de vagas com busca e filtros  
✔️ Barra de pesquisa integrada ao header (ativa no dashboard)  
✔️ Avatar com foto ou iniciais  
✔️ Design responsivo com Tailwind CSS  
✔️ Integração com API em Django REST Framework  

## ▶️ Como Executar o Projeto

### **1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd nextwork
```

### **2. Instale as dependências**
```
npm install 
```

### **3. Execute o projeto**
```
npm run dev
```

### **4. Aplicacação estará disponível em**
```
http://localhost:3000
```

---

### 🔗 Integração com o Back-End

Este front-end foi desenvolvido para consumir uma API construída com Django REST Framework.
A comunicação é feita via Axios, com endpoints configurados para:

* Registro de usuários

* Login e autenticação

* Edição de perfil

* Upload de currículo

* Listagem e filtragem de vagas

---

### 👨‍🎓 Sobre o Projeto

Este projeto foi desenvolvido como entrega avaliativa da disciplina Back-End Frameworks.
O foco foi aplicar conceitos de consumo de API, autenticação, criação de UI responsiva e boas práticas de desenvolvimento Front-End.