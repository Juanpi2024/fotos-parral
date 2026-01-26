import {
    AbsoluteFill,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Img,
    staticFile,
} from 'remotion';

// Colores de la marca
const COLORS = {
    primary: '#2c3e50',
    secondary: '#8B4513',
    accent: '#d4a574',
    light: '#f5f5dc',
    sepia: '#704214',
};

type VideoPromoProps = {
    title: string;
    subtitle: string;
};

// Escena 1: Intro con logo
const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoScale = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.sepia} 100%)`,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Patrón de fondo */}
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `radial-gradient(circle at 20% 80%, ${COLORS.accent}22 0%, transparent 50%)`,
                }}
            />

            {/* Logo/Ícono */}
            <div
                style={{
                    transform: `scale(${logoScale})`,
                    fontSize: 120,
                    marginBottom: 40,
                }}
            >
                📷
            </div>

            {/* Título principal */}
            <h1
                style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 80,
                    color: COLORS.light,
                    opacity: titleOpacity,
                    textAlign: 'center',
                    textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
                    margin: 0,
                }}
            >
                Archivos en Movimiento
            </h1>

            {/* Subtítulo */}
            <p
                style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 36,
                    color: COLORS.accent,
                    opacity: subtitleOpacity,
                    marginTop: 20,
                    fontStyle: 'italic',
                }}
            >
                Reactivando la Memoria e Identidad Parralina
            </p>
        </AbsoluteFill>
    );
};

// Escena 2: Objetivos (con iconos animados)
const ObjectivesScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const objectives = [
        { icon: '🏛️', text: 'Preservar el patrimonio visual de Parral' },
        { icon: '📚', text: 'Educar a nuevas generaciones' },
        { icon: '🤝', text: 'Conectar comunidad e historia' },
    ];

    return (
        <AbsoluteFill
            style={{
                background: COLORS.light,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 100,
            }}
        >
            <h2
                style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 56,
                    color: COLORS.primary,
                    marginBottom: 60,
                    textAlign: 'center',
                }}
            >
                Nuestros Objetivos
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {objectives.map((obj, index) => {
                    const delay = index * 20;
                    const itemOpacity = interpolate(frame, [delay, delay + 30], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });
                    const itemX = interpolate(frame, [delay, delay + 30], [-100, 0], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 30,
                                opacity: itemOpacity,
                                transform: `translateX(${itemX}px)`,
                            }}
                        >
                            <span style={{ fontSize: 64 }}>{obj.icon}</span>
                            <span
                                style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: 36,
                                    color: COLORS.sepia,
                                }}
                            >
                                {obj.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// Escena 3: Recursos (simulando fotos antiguas)
const ResourcesScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Simulamos "polaroids" de fotos antiguas con imágenes reales
    const photos = [
        { label: 'Plaza de Armas 1920', src: staticFile('images/plaza.webp'), rotation: -5, delay: 0 },
        { label: 'Estación de Trenes', src: staticFile('images/estacion.webp'), rotation: 3, delay: 15 },
        { label: 'Comercio Antiguo', src: staticFile('images/comercio.webp'), rotation: -2, delay: 30 },
    ];

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(180deg, ${COLORS.sepia} 0%, ${COLORS.primary} 100%)`,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h2
                style={{
                    position: 'absolute',
                    top: 80,
                    fontFamily: 'Georgia, serif',
                    fontSize: 56,
                    color: COLORS.light,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
            >
                Más de 200 fotografías históricas
            </h2>

            <div
                style={{
                    display: 'flex',
                    gap: 40,
                    marginTop: 40,
                }}
            >
                {photos.map((photo, index) => {
                    const photoScale = spring({
                        frame: frame - photo.delay,
                        fps,
                        config: { damping: 15, stiffness: 80 },
                    });

                    return (
                        <div
                            key={index}
                            style={{
                                width: 300,
                                height: 380,
                                background: '#fff',
                                padding: 15,
                                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                                transform: `scale(${Math.max(0, photoScale)}) rotate(${photo.rotation}deg)`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {/* Área de la "foto" */}
                            <div
                                style={{
                                    width: '100%',
                                    height: 280,
                                    background: '#eee',
                                    marginBottom: 15,
                                    overflow: 'hidden',
                                    border: '1px solid #ddd',
                                }}
                            >
                                <Img
                                    src={photo.src}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        filter: 'sepia(0.4) contrast(1.1)',
                                    }}
                                />
                            </div>
                            {/* Etiqueta */}
                            <p
                                style={{
                                    fontFamily: 'Courier New, monospace',
                                    fontSize: 20,
                                    color: '#333',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: 0,
                                }}
                            >
                                {photo.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// Escena 4: Call to Action
const CTAScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const pulseScale = 1 + Math.sin(frame * 0.15) * 0.05;

    const textOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
    });

    const urlOpacity = interpolate(frame, [40, 70], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.sepia} 100%)`,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    opacity: textOpacity,
                }}
            >
                <h2
                    style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 64,
                        color: COLORS.light,
                        marginBottom: 30,
                    }}
                >
                    ¡Explora nuestra historia!
                </h2>

                <p
                    style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: 32,
                        color: COLORS.light,
                        marginBottom: 50,
                    }}
                >
                    Material educativo gratuito para toda la comunidad
                </p>
            </div>

            {/* URL / Mensaje */}
            <div
                style={{
                    background: COLORS.light,
                    padding: '20px 60px',
                    borderRadius: 50,
                    transform: `scale(${pulseScale})`,
                    opacity: urlOpacity,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
            >
                <span
                    style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: 36,
                        color: COLORS.sepia,
                        fontWeight: 'bold',
                        letterSpacing: 2
                    }}
                >
                    PRÓXIMAMENTE EN LÍNEA
                </span>
            </div>

            {/* Logos institucionales */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 60,
                    display: 'flex',
                    gap: 40,
                    opacity: urlOpacity,
                }}
            >
                <span style={{ fontSize: 40, color: COLORS.light }}>🏛️ Amigos del CEIA Parral</span>
            </div>
        </AbsoluteFill>
    );
};

// Composición principal
export const VideoPromo: React.FC<VideoPromoProps> = ({ title, subtitle }) => {
    return (
        <AbsoluteFill>
            {/* Escena 1: Intro (0-4 segundos) */}
            <Sequence from={0} durationInFrames={120}>
                <IntroScene />
            </Sequence>

            {/* Escena 2: Objetivos (4-8 segundos) */}
            <Sequence from={120} durationInFrames={120}>
                <ObjectivesScene />
            </Sequence>

            {/* Escena 3: Recursos (8-12 segundos) */}
            <Sequence from={240} durationInFrames={120}>
                <ResourcesScene />
            </Sequence>

            {/* Escena 4: CTA (12-15 segundos) */}
            <Sequence from={360} durationInFrames={90}>
                <CTAScene />
            </Sequence>
        </AbsoluteFill>
    );
};
