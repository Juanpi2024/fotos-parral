import {
    AbsoluteFill,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from 'remotion';

// Colores de la marca (reutilizados para consistencia)
const COLORS = {
    primary: '#2c3e50',    // Azul oscuro elegante
    secondary: '#c9a961',  // Dorado premium
    dark: '#1a1510',       // Negro cálido
    light: '#f4e9d9',      // Crema suave
    accent: '#8b7355',     // Marrón tierra
};

// Estilos base
const containerStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${COLORS.dark} 0%, #2d2419 100%)`,
    color: COLORS.light,
    fontFamily: 'Merriweather, serif',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '40px',
};

const titleStyle: React.CSSProperties = {
    fontSize: 70,
    color: COLORS.secondary,
    marginBottom: 20,
    textShadow: '0 4px 20px rgba(201, 169, 97, 0.3)',
};

const subtitleStyle: React.CSSProperties = {
    fontFamily: 'Lato, sans-serif',
    fontSize: 35,
    color: COLORS.light,
    opacity: 0.9,
    fontWeight: 300,
    letterSpacing: 2,
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
                <div style={{ fontSize: 100, marginBottom: 30 }}>👥</div>
                <h1 style={titleStyle}>Un Equipo<br />Multidisciplinario</h1>
                <p style={subtitleStyle}>Profesionales al servicio de la memoria</p>
            </div>
        </AbsoluteFill>
    );
};

const RoleScene: React.FC<{
    icon: string;
    role: string;
    detail: string;
    highlight?: string;
}> = ({ icon, role, detail, highlight }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideUp = spring({
        frame,
        fps,
        from: 100,
        to: 0,
        config: { damping: 15 },
    });

    const opacity = interpolate(frame, [0, 15], [0, 1]);

    return (
        <AbsoluteFill style={{ ...containerStyle }}>
            <div style={{ transform: `translateY(${slideUp}px)`, opacity }}>
                <div style={{ fontSize: 120, marginBottom: 40, filter: 'drop-shadow(0 0 20px rgba(201, 169, 97, 0.4))' }}>
                    {icon}
                </div>
                <h2 style={{ ...titleStyle, fontSize: 60 }}>{role}</h2>

                {highlight && (
                    <div style={{
                        background: 'rgba(201, 169, 97, 0.15)',
                        border: `2px solid ${COLORS.secondary}`,
                        borderRadius: 20,
                        padding: '15px 40px',
                        display: 'inline-block',
                        marginBottom: 30,
                    }}>
                        <span style={{
                            fontSize: 38,
                            color: COLORS.secondary,
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        }}>
                            {highlight}
                        </span>
                    </div>
                )}

                <p style={{ ...subtitleStyle, fontSize: 32, maxWidth: 1200, margin: '0 auto', lineHeight: 1.5 }}>
                    {detail}
                </p>
            </div>
        </AbsoluteFill>
    );
};

const DualRoleScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const leftX = spring({ frame, fps, from: -500, to: 0, config: { damping: 20 } });
    const rightX = spring({ frame, fps, from: 500, to: 0, config: { damping: 20 } });

    return (
        <AbsoluteFill style={{ ...containerStyle, flexDirection: 'row', gap: 60 }}>
            {/* Panel Izquierdo */}
            <div style={{
                flex: 1,
                transform: `translateX(${leftX}px)`,
                borderRight: `2px solid ${COLORS.secondary}`,
                paddingRight: 60
            }}>
                <div style={{ fontSize: 80, marginBottom: 20 }}>📖</div>
                <h3 style={{ fontSize: 45, color: COLORS.secondary, marginBottom: 15 }}>Historiador y Asesor</h3>
                <p style={{ fontSize: 28, color: COLORS.light }}>
                    Autor de libros de Parral<br />Investigación Patrimonial
                </p>
            </div>

            {/* Panel Derecho */}
            <div style={{
                flex: 1,
                transform: `translateX(${rightX}px)`,
                paddingLeft: 20
            }}>
                <div style={{ fontSize: 80, marginBottom: 20 }}>🎓</div>
                <h3 style={{ fontSize: 45, color: COLORS.secondary, marginBottom: 15 }}>Docente Experta</h3>
                <p style={{ fontSize: 28, color: COLORS.light }}>
                    Red de Maestros<br />15 años de experiencia
                </p>
            </div>
        </AbsoluteFill>
    );
};

const OutroScene: React.FC = () => {
    const frame = useCurrentFrame();

    // Efecto de latido suave
    const scale = 1 + Math.sin(frame * 0.1) * 0.02;
    const opacity = interpolate(frame, [0, 20], [0, 1]);

    return (
        <AbsoluteFill style={{ ...containerStyle }}>
            <div style={{ transform: `scale(${scale})`, opacity }}>
                <h2 style={{ fontSize: 50, color: COLORS.light, marginBottom: 40, fontStyle: 'italic' }}>
                    "Comprometidos con Parral"
                </h2>
                <div style={{
                    border: `4px solid ${COLORS.secondary}`,
                    padding: '30px 60px',
                    borderRadius: 15,
                    background: 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h1 style={{ ...titleStyle, fontSize: 80, margin: 0 }}>
                        Archivos en Movimiento
                    </h1>
                </div>
            </div>
        </AbsoluteFill>
    );
};

export const TeamPromo: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000' }}>
            {/* 1. Intro (0-3s) = 90 frames */}
            <Sequence from={0} durationInFrames={90}>
                <IntroScene />
            </Sequence>

            {/* 2. Coordinador (3-6s) = 90 frames */}
            <Sequence from={90} durationInFrames={90}>
                <RoleScene
                    icon="💼"
                    role="Coordinador / Product Manager"
                    detail="Gestión Estratégica • Técnico en Administración y Contabilidad"
                />
            </Sequence>

            {/* 3. Asistente Social (6-11s) = 150 frames (Damos más tiempo por el texto) */}
            <Sequence from={180} durationInFrames={150}>
                <RoleScene
                    icon="🤝"
                    role="Asistente Social"
                    highlight="Bajada a Talleres Comunitarios"
                    detail="Articulación territorial y gestión de redes de apoyo"
                />
            </Sequence>

            {/* 4. Historia y Educación (11-15s) = 120 frames */}
            <Sequence from={330} durationInFrames={120}>
                <DualRoleScene />
            </Sequence>

            {/* 5. Informática (15-18s) = 90 frames */}
            <Sequence from={450} durationInFrames={90}>
                <RoleScene
                    icon="💻"
                    role="Ingeniero en Informática"
                    detail="Soporte Tecnológico • Desarrollo e Infraestructura Digital"
                />
            </Sequence>

            {/* 6. Cierre (18-22s) = 120 frames */}
            <Sequence from={540} durationInFrames={120}>
                <OutroScene />
            </Sequence>
        </AbsoluteFill>
    );
};
