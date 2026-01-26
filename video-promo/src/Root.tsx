import { Composition } from 'remotion';
import { VideoPromo } from './VideoPromo';
import { TeamPromo } from './TeamPromo';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="VideoPromo"
                component={VideoPromo}
                durationInFrames={450} // 15 segundos a 30fps
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    title: "Archivos en Movimiento",
                    subtitle: "Reactivando la Memoria e Identidad Parralina"
                }}
            />
            <Composition
                id="TeamPromo"
                component={TeamPromo}
                durationInFrames={660} // 22 segundos a 30fps
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
