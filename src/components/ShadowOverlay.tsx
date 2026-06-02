import React, { useRef, useId, useEffect, useState, CSSProperties } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';

// Type definitions
interface ResponsiveImage {
    src: string;
    alt?: string;
    srcSet?: string;
}

interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface ShadowOverlayProps {
    type?: 'preset' | 'custom';
    presetIndex?: number;
    customImage?: ResponsiveImage;
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
): number {
    if (fromLow === fromHigh) {
        return toLow;
    }
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
    const id = useId();
    const cleanId = id.replace(/:/g, "");
    const instanceId = `shadowoverlay-${cleanId}`;
    return instanceId;
};

export function ShadowOverlay({
    sizing = 'fill',
    color = 'rgba(255, 255, 255, 0.12)', // Subtle light shadow on dark background
    animation = { scale: 35, speed: 10 },    // Default values for movement
    noise = { opacity: 0.12, scale: 0.5 },     // Subtle premium noise
    style,
    className,
    children
}: ShadowOverlayProps) {
    const id = useInstanceId();
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkMobile = window.matchMedia('(pointer: coarse)').matches || 
                            ('ontouchstart' in window) || 
                            (navigator.maxTouchPoints > 0);
        setIsTouchDevice(checkMobile);
    }, []);

    // Disable SVG animation & SVG filter processing completely on touch-capable (mobile/tablet) devices
    const animationEnabled = !isTouchDevice && animation && animation.scale > 0;
    const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

    const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

    useEffect(() => {
        if (feColorMatrixRef.current && animationEnabled) {
            if (hueRotateAnimation.current) {
                hueRotateAnimation.current.stop();
            }
            hueRotateMotionValue.set(0);
            hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
                duration: animationDuration / 25,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
                ease: "linear",
                delay: 0,
                onUpdate: (value: number) => {
                    if (feColorMatrixRef.current) {
                        feColorMatrixRef.current.setAttribute("values", String(value));
                    }
                }
            });

            return () => {
                if (hueRotateAnimation.current) {
                    hueRotateAnimation.current.stop();
                }
            };
        }
    }, [animationEnabled, animationDuration, hueRotateMotionValue]);

    return (
        <div
            className={className}
            style={{
                overflow: "hidden",
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                ...style
            }}
        >
            {/* Inject a lightweight, hardware-accelerated style sheet for smooth mobile floating */}
            {isTouchDevice && (
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes mobileFloatShadow {
                        0% { transform: scale(1) rotate(0deg) translate3d(0, 0, 0); }
                        50% { transform: scale(1.1) rotate(4deg) translate3d(10px, -20px, 0); }
                        100% { transform: scale(0.95) rotate(-4deg) translate3d(-10px, 20px, 0); }
                    }
                `}} />
            )}
            <div
                style={{
                    position: "absolute",
                    inset: isTouchDevice ? "-10%" : -displacementScale,
                    filter: isTouchDevice ? "none" : (animationEnabled ? `url(#${id}) blur(4px)` : "blur(40px)"),
                    opacity: isTouchDevice ? 0.35 : 1,
                    width: isTouchDevice ? "120%" : "100%",
                    height: isTouchDevice ? "120%" : "100%",
                    animation: isTouchDevice ? "mobileFloatShadow 30s ease-in-out infinite alternate" : "none",
                    willChange: isTouchDevice ? "transform" : "auto",
                    background: isTouchDevice ? `radial-gradient(circle at 50% 50%, ${color || 'rgba(255,255,255,0.1)'} 0%, transparent 60%)` : "none"
                }}
            >
                {animationEnabled && (
                    <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                        <defs>
                            <filter id={id}>
                                <feTurbulence
                                    result="undulation"
                                    numOctaves="2"
                                    baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                                    seed="0"
                                    type="turbulence"
                                />
                                <feColorMatrix
                                    ref={feColorMatrixRef}
                                    in="undulation"
                                    type="hueRotate"
                                    values="180"
                                />
                                <feColorMatrix
                                    in="dist"
                                    result="circulation"
                                    type="matrix"
                                    values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="circulation"
                                    scale={displacementScale}
                                    result="dist"
                                />
                                <feDisplacementMap
                                    in="dist"
                                    in2="undulation"
                                    scale={displacementScale}
                                    result="output"
                                />
                            </filter>
                        </defs>
                    </svg>
                )}
                {!isTouchDevice && (
                    <div
                        style={{
                            backgroundColor: color,
                            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
                            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    />
                )}
            </div>

            {children && (
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {children}
                </div>
            )}

            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: "repeat",
                        opacity: noise.opacity / 2,
                        pointerEvents: "none"
                    }}
                />
            )}
        </div>
    );
}
