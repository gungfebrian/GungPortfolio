import Image from 'next/image';

export const AIESECLogo = ({ className }: { className?: string }) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Image
                src="/Gambar/AIESEC.png"
                alt="AIESEC"
                width={48}
                height={48}
                className="object-contain w-full h-full grayscale brightness-[500]"
            />
        </div>
    );
};
