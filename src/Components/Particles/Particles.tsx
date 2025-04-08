const Particles = () => {
    // Generate random positions for particles
    const particles = Array.from({ length: 20 }).map((_, index) => ({
        id: index,
        size: Math.random() * 6 + 4, // Random size between 4-10px
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`, // Random duration between 2-5s
        animationDelay: `${Math.random() * 2}s`, // Random delay between 0-2s
    }));

    return (
        <div className="fixed inset-0 pointer-events-none">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-white/10 animate-float"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.left,
                        top: particle.top,
                        animationDuration: particle.animationDuration,
                        animationDelay: particle.animationDelay,
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;
