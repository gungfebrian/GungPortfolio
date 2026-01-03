import Image from 'next/image';

export const TEDxLogo = ({ className }: { className?: string }) => {
    return (
        <div className="w-full h-full flex items-center justify-center p-2">
            <Image
                src="/Gambar/tedx.png"
                alt="TEDx"
                width={40}
                height={40}
                className="object-contain grayscale brightness-200"
            />
        </div>
    );
};
