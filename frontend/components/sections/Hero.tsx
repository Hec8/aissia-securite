import React from 'react';
import { Container } from '../ui/Container';

interface HeroProps {
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    description,
    image,
    children,
}) => {
    return (
        <section className="relative bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary-light)] text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <Container className="relative z-10">
                <div className="py-20 md:py-32 max-w-4xl">
                    {subtitle && (
                        <p className="text-[var(--secondary)] font-semibold mb-4 animate-fade-in-down">
                            {subtitle}
                        </p>
                    )}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up stagger-1">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed animate-fade-in-up stagger-2">
                            {description}
                        </p>
                    )}
                    {children && <div className="animate-fade-in-up stagger-3">{children}</div>}
                </div>
            </Container>
        </section>
    );
};
