import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export function TermsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className='text-blue-400 cursor-pointer underline'>
                    Termos de Uso e Privacidade
                </span>
            </DialogTrigger>
            <DialogContent className='max-w-2xl max-h-[80vh] dark:bg-gray-900'>
                <DialogHeader>
                    <DialogTitle>Termos e Condições de Uso — NextWork</DialogTitle>
                    <DialogDescription>
                        Por favor, leia atentamente antes de utilizar a plataforma.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className='h-[60vh] pr-4'>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p><strong>1. Aceitação dos Termos</strong><br />
                            Ao acessar e utilizar a plataforma <em>NextWork</em> ("nós", "nosso" ou "plataforma"), o usuário concorda em cumprir e estar legalmente vinculado a estes Termos e Condições de Uso. Caso não concorde, não deve utilizar a plataforma.</p>

                        <p><strong>2. Descrição dos Serviços</strong><br />
                            A <em>NextWork</em> oferece uma plataforma que conecta candidatos a vagas de emprego e empresas que buscam profissionais. O serviço inclui a divulgação de oportunidades, perfis profissionais e funcionalidades para facilitar esse contato. A <em>NextWork</em> não atua como agência de emprego, nem garante a efetivação de contratações.</p>

                        <p><strong>3. Elegibilidade</strong><br />
                            Para utilizar a <em>NextWork</em>, o usuário deve ter, no mínimo, 18 anos de idade ou a idade legal de contratação em sua jurisdição. O uso da plataforma por menores de idade deve ser supervisionado por um responsável legal.</p>

                        <p><strong>4. Cadastro e Conta</strong><br />
                            O usuário deve fornecer informações precisas, completas e atualizadas ao se cadastrar na <em>NextWork</em>. É de responsabilidade exclusiva do usuário:
                            <ul className="list-disc list-inside">
                                <li>Manter a confidencialidade de suas credenciais de acesso;</li>
                                <li>Notificar imediatamente a <em>NextWork</em> sobre qualquer uso não autorizado de sua conta;</li>
                                <li>Garantir que o uso da conta esteja em conformidade com estes Termos.</li>
                            </ul></p>

                        <p><strong>5. Obrigações do Usuário</strong><br />
                            O usuário compromete-se a:
                            <ul className="list-disc list-inside">
                                <li>Utilizar a plataforma de maneira ética e conforme a legislação aplicável;</li>
                                <li>Não inserir informações falsas, enganosas ou que infrinjam direitos de terceiros;</li>
                                <li>Não realizar atividades que comprometam a segurança ou funcionamento da plataforma;</li>
                                <li>Respeitar outros usuários e suas informações.</li>
                            </ul></p>

                        <p><strong>6. Condições de Uso</strong><br />
                            O usuário concorda que:
                            <ul className="list-disc list-inside">
                                <li>O conteúdo disponibilizado na plataforma (como vagas, currículos e perfis) é de responsabilidade exclusiva de quem o disponibilizou;</li>
                                <li>A <em>NextWork</em> não verifica previamente as informações inseridas por terceiros e não se responsabiliza por sua veracidade;</li>
                                <li>O uso da plataforma é por conta e risco do usuário.</li>
                            </ul></p>

                        <p><strong>7. Limitação de Responsabilidade</strong><br />
                            A <em>NextWork</em> não se responsabiliza por:
                            <ul className="list-disc list-inside">
                                <li>Quaisquer prejuízos ou danos resultantes de negociações ou contratações realizadas entre usuários;</li>
                                <li>A disponibilidade, qualidade ou condições das vagas ofertadas;</li>
                                <li>Falhas técnicas, interrupções ou indisponibilidade temporária do serviço.</li>
                            </ul></p>

                        <p><strong>8. Propriedade Intelectual</strong><br />
                            Todos os direitos relativos à marca <em>NextWork</em>, logotipos, conteúdos, layout e funcionalidades são de titularidade exclusiva da plataforma. É proibida a reprodução, distribuição ou uso não autorizado desses elementos.</p>

                        <p><strong>9. Encerramento e Suspensão</strong><br />
                            A <em>NextWork</em> se reserva o direito de suspender ou encerrar, a qualquer momento e sem aviso prévio, contas que violem estes Termos ou que comprometam a segurança e integridade da plataforma.</p>

                        <p><strong>10. Alterações nos Termos</strong><br />
                            A <em>NextWork</em> pode, a seu critério, alterar estes Termos e Condições de Uso a qualquer momento. As alterações entrarão em vigor assim que publicadas na plataforma. O uso continuado após a alteração implica na aceitação dos novos termos.</p>

                        <p><strong>11. Disposições Gerais</strong><br />
                            Caso qualquer disposição destes Termos seja considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.</p>

                        <p><strong>12. Legislação e Foro</strong><br />
                            Estes Termos serão regidos pelas leis do país em que a <em>NextWork</em> está estabelecida, sendo eleito o foro da sua sede para dirimir quaisquer controvérsias oriundas deste instrumento.</p>
                    </div>
                </ScrollArea>

                <DialogFooter>
                    <DialogClose>
                        <Button variant='outline'>Fechar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}