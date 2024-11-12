"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";

export default function Test() {
    const [image, setImage] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>("");

    const onFileChange = (file: File | null) => {
        setImage(file);
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!image) return alert('Please select an image to upload.');
        if (!prompt) return alert('Please enter a prompt.');

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET as string);

        try {
            const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const cloudinaryData = await cloudinaryResponse.json();
            if (cloudinaryData.secure_url) {
                alert('Image uploaded successfully!');
                console.log('Image URL:', cloudinaryData.secure_url);

                // Send both image URL and prompt to the Python backend
                const backendResponse = await fetch('http://127.0.0.1:8000/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        image_url: cloudinaryData.secure_url,
                        prompt: prompt,
                    }),
                });

                if (backendResponse.ok) {
                    const backendData = await backendResponse.json();
                    console.log('Response from Python backend:', backendData);
                } else {
                    console.error('Failed to send data to backend');
                }
            } else {
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
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
                        placeholder="Enter prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1 px-4 py-2 border-2 focus:outline-none focus:border-neutral-700 rounded-lg bg-neutral-900 text-neutral-300 placeholder-neutral-300"
                    />
                    <button
                        onClick={handleUpload}
                        className="gradient-button basis-1/7 w-auto font-bold py-2 px-4 rounded-lg text-zinc-900"
                    >
                        Generate
                    </button>
                </div>
            )}
        </div>
    );
}
