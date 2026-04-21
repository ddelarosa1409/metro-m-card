import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, FileText, Lock, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import TopBar from "@/components/TopBar";

const Terms = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tab = params.get("tab") === "privacy" ? "privacy" : "terms";

  const setTab = (t: "terms" | "privacy") => navigate(`/terms?tab=${t}`, { replace: true });

  return (
    <AppLayout showNav={false}>
      <TopBar title="Términos y Privacidad" />

      <div className="px-4 mt-4">
        {/* Hero */}
        <div className="bg-card rounded-card p-5 shadow-sm flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
            <Shield className="text-primary-medium" size={24} />
          </div>
          <div>
            <p className="text-foreground font-bold text-sm">Tu seguridad es prioridad</p>
            <p className="text-muted-foreground text-xs">Última actualización: Abr 2026</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-button p-1 mb-4">
          <button
            onClick={() => setTab("terms")}
            className={`flex-1 h-9 rounded-button text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
              tab === "terms" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            <FileText size={14} /> Términos
          </button>
          <button
            onClick={() => setTab("privacy")}
            className={`flex-1 h-9 rounded-button text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
              tab === "privacy" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            <Lock size={14} /> Privacidad
          </button>
        </div>

        {tab === "terms" ? (
          <div className="space-y-3 pb-8">
            <Section icon={<CheckCircle2 size={18} className="text-success" />} title="1. Aceptación del servicio">
              Al usar M-Charging aceptas estos términos. El servicio te permite recargar y administrar tu tarjeta del Metro de Santo Domingo y Teleférico desde tu dispositivo móvil.
            </Section>
            <Section icon={<Users size={18} className="text-primary-medium" />} title="2. Cuenta de usuario">
              Debes proporcionar información veraz (nombre, cédula, correo). Tu cédula es única y no se puede modificar después del registro. Eres responsable de mantener la seguridad de tu contraseña.
            </Section>
            <Section icon={<AlertCircle size={18} className="text-alert" />} title="3. Uso del saldo">
              El saldo recargado es no reembolsable salvo en casos previstos por la OPRET. Las recargas se reflejan al instante en tu tarjeta NFC vinculada.
            </Section>
            <Section icon={<Shield size={18} className="text-primary" />} title="4. Responsabilidades">
              No usaremos tu cuenta para fines ilícitos. Nos reservamos el derecho de suspender cuentas con actividad sospechosa.
            </Section>
            <Section icon={<FileText size={18} className="text-muted-foreground" />} title="5. Modificaciones">
              Podemos actualizar estos términos. Te notificaremos por la app antes de que entren en vigor.
            </Section>
          </div>
        ) : (
          <div className="space-y-3 pb-8">
            <Section icon={<Lock size={18} className="text-success" />} title="Datos que recopilamos">
              Nombre, apellido, cédula, correo, teléfono y datos de tarjeta NFC. Información de transacciones para mostrar tu historial.
            </Section>
            <Section icon={<Shield size={18} className="text-primary-medium" />} title="Cómo los usamos">
              Para procesar recargas, validar acceso al Metro, enviar notificaciones de transacciones y mejorar el servicio. Nunca vendemos tu información a terceros.
            </Section>
            <Section icon={<CheckCircle2 size={18} className="text-success" />} title="Tus derechos">
              Puedes acceder, modificar o eliminar tu cuenta en cualquier momento desde "Mi perfil". La cédula permanece como identificador único.
            </Section>
            <Section icon={<AlertCircle size={18} className="text-alert" />} title="Seguridad">
              Tus datos viajan cifrados (TLS 1.3). No almacenamos tu CVV. Contraseñas hasheadas con bcrypt.
            </Section>
            <Section icon={<Users size={18} className="text-primary" />} title="Contacto">
              ¿Dudas? Escríbenos a privacidad@metrosdq.do o llama al *462.
            </Section>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="w-full h-12 bg-primary text-primary-foreground rounded-button font-medium text-sm hover:opacity-90 transition-opacity mb-6"
        >
          Entendido
        </button>
      </div>
    </AppLayout>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-card p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
    </div>
    <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
  </div>
);

export default Terms;
