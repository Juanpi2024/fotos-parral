import {
    AbsoluteFill,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from 'remotion';

// Colores de la marca Rojo
const COLORS = {
    primary: '#d32f2f',    // Rojo Intenso
    secondary: '#ffffff',  // Blanco Clean
    dark: '#121212',       // Negro Mate
    accent: '#ff5252',     // Rojo Brillante
};

const containerStyle: React.CSSProperties = {
    background: COLORS.dark,
    color: COLORS.secondary,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '40px',
};

const titleStyle: React.CSSProperties = {
    fontSize: 80,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
};

const subtitleStyle: React.CSSProperties = {
    fontSize: 40,
    color: COLORS.secondary,
    opacity: 0.9,
    fontWeight: 300,
};

// --- Escenas ---

const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const scale = spring({ frame, fps, config: { damping: 200 } });
    const opacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill style={{ ...containerStyle }}>
            <div style={{ transform: `scale(${scale})`, opacity }}>
                <div style={{ fontSize: 120, marginBottom: 30 }}>🔴</div>
                <h1 style={titleStyle}>La Orquesta Rojo</h1>
                <p style={subtitleStyle}>Automatización Maestra de Agentes</p>
            </div>
        </AbsoluteFill>
    );
};

const AgentScene: React.FC<{
    icon: string;
    name: string;
    specialty: string;
    mission: string;
}> = ({ icon, name, specialty, mission }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideUp = spring({
        frame,
        fps,
        from: 50,
        to: 0,
        config: { damping: 15 },
    });

    const opacity = interpolate(frame, [0, 15], [0, 1]);

    return (
        <AbsoluteFill style={{ ...containerStyle }}>
            <div style={{ transform: `translateY(${slideUp}px)`, opacity }}>
                <div style={{ fontSize: 130, marginBottom: 30 }}>{icon}</div>
                <h2 style={{ ...titleStyle, fontSize: 70, color: COLORS.secondary }}>{name}</h2>
                <div style={{
                    background: COLORS.primary,
                    padding: '10px 30px',
                    borderRadius: 10,
                    display: 'inline-block',
                    marginBottom: 20
                }}>
                    <span style={{ fontSize: 35, fontWeight: 'bold' }}>{specialty}</span>
                </div>
                <p style={{ ...subtitleStyle, fontSize: 30, maxWidth: 800, margin: '0 auto' }}>
                    {mission}
                </p>
            </div>
        </AbsoluteFill>
    );
};

const OutroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill style={{ ...containerStyle }}>
            <div style={{ opacity }}>
                <div style={{ fontSize: 100, marginBottom: 20 }}>🚀</div>
                <h2 style={{ fontSize: 40, color: COLORS.secondary, marginBottom: 40 }}>
                    Potenciando el Futuro Educativo
                </h2>
                <div style={{
                    border: `4px solid ${COLORS.primary}`,
                    padding: '20px 50px',
                    borderRadius: 15,
                }}>
                    <h1 style={{ ...titleStyle, margin: 0 }}>
                        Automatizaciones Juan Ramirez
                    </h1>
                </div>
            </div>
        </AbsoluteFill>
    );
};

export const OrchestraPromo: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000' }}>
            {/* Intro */}
            <Sequence from={0} durationInFrames={75}>
                <IntroScene />
            </Sequence>

            {/* Agentes en cadena rápida */}
            <Sequence from={75} durationInFrames={60}>
                <AgentScene icon="🍎" name="Fidel" specialty="Pedagógico" mission="Generación de material educativo de alta calidad." />
            </Sequence>
            <Sequence from={135} durationInFrames={60}>
                <AgentScene icon="🛡️" name="El Che" specialty="Limpieza" mission="Sanitización de datos y privacidad total." />
            </Sequence>
            <Sequence from={195} durationInFrames={60}>
                <AgentScene icon="🚀" name="Lenin" specialty="Publicador" mission="Distribución automática en ProfeSocial." />
            </Sequence>
            <Sequence from={255} durationInFrames={60}>
                <AgentScene icon="🇷🇺" name="Putin" specialty="Nexo" mission="Gestión inteligente de correos y comunicaciones." />
            </Sequence>
            <Sequence from={315} durationInFrames={60}>
                <AgentScene icon="📊" name="Stalin" specialty="Estratega" mission="Análisis de cobertura curricular." />
            </Sequence>
            <Sequence from={375} durationInFrames={60}>
                <AgentScene icon="📈" name="Xi Jinping" specialty="Marketing" mission="Detección de tendencias de mercado." />
            </Sequence>
            <Sequence from={435} durationInFrames={60}>
                <AgentScene icon="🧾" name="Marx" specialty="Financiero" mission="Control de gastos y adquisiciones." />
            </Sequence>
            <Sequence from={495} durationInFrames={60}>
                <AgentScene icon="📝" name="Mao" specialty="Encuestas" mission="Diseño de insights y clima escolar." />
            </Sequence>
            <Sequence from={555} durationInFrames={60}>
                <AgentScene icon="🌐" name="Ho Chi Minh" specialty="Web" mission="Visualización de datos y dashboards." />
            </Sequence>
            <Sequence from={615} durationInFrames={60}>
                <AgentScene icon="🤝" name="Allende" specialty="CRM" mission="Gestión de soporte y comunidad." />
            </Sequence>

            {/* Outro */}
            <Sequence from={675} durationInFrames={120}>
                <OutroScene />
            </Sequence>
        </AbsoluteFill>
    );
};
