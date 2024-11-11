"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";

export default function Test() {
    const [image, setImage] = useState<File | null>(null);

    const onFileChange = (file: File | null) => {
        setImage(file);
    };

    return (
        <div className="min-h-screen items-center justify-center w-[50vw] m-auto flex flex-col gap-6">
            <div className="basis-1">
                <FileUpload onChange={onFileChange} />
            </div>
            {image && (
                <div className="flex items-center gap-4 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Enter text"
                        className="flex-1 px-4 py-2 border-2 focus:outline-none focus:border-neutral-700 rounded-lg bg-neutral-900 text-neutral-300 placeholder-neutral-300"
                    />
                    <button
                        className="gradient-button basis-1/7 w-auto font-bold py-2 px-4 rounded-lg text-zinc-900"
                    >
                        Generate
                    </button>
                </div>
            )}
        </div>
    );
}
