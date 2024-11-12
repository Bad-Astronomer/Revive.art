"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function UploadPage() {
    const [image, setImage] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [backendImageUrl, setBackendImageUrl] = useState<string | null>(null);
    const { toast } = useToast();

    const onFileChange = (file: File | null) => {
        setImage(file);
    };

    const handleReset = () => {
        setImage(null);
        setPrompt("");
        setBackendImageUrl(null);
    }

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!image) {
            console.log("No image selected");
            return toast({ title: "Error", description: "Please select an image to upload." });
        };
        if (!prompt) {
            console.log("No prompt entered");
            return toast({ title: "Error", description: "Please enter a prompt." });
        };

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET as string);

        try {
            const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const cloudinaryData = await cloudinaryResponse.json();
            if (cloudinaryData.secure_url) {
                toast({ title: "Image Uploaded", description: "Image uploaded to Cloudinary successfully!" });

                const backendResponse = await fetch("http://127.0.0.1:8000/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image_url: cloudinaryData.secure_url,
                        prompt: prompt,
                    }),
                });

                if (backendResponse.ok) {
                    const backendData = await backendResponse.json();
                    setBackendImageUrl(backendData.image_url);  // Set the backend image URL here
                    toast({ title: "Success", description: "Response received from backend!" });
                    console.log("Response from Python backend:", backendData);
                } else {
                    toast({ title: "Error", description: "Failed to send data to backend." });
                }
            } else {
                toast({ title: "Error", description: "Failed to upload image to Cloudinary." });
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast({ title: "Error", description: "An error occurred during upload." });
        }
    };

    return (
        <div className="min-h-screen items-center justify-center w-[50vw] m-auto flex flex-col gap-6">
            <div className="basis-1">
                {!backendImageUrl ? (
                    <>
                    <FileUpload onChange={onFileChange} />
                    {
                        image && (
                        <div className="flex items-center gap-4 w-full max-w-xl mt-4">
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
                        )
                    }
                    </>
                    
                ) : (
                    <motion.div
                        key="file-upload-preview"
                        layoutId="file-upload"
                        className="flex flex-col items-center justify-center gap-4"
                    >
                        <motion.div
                            className={cn(
                                "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start p-4 w-full mx-auto rounded-md shadow-sm"
                                )}
                        >
                            <Image
                                src={backendImageUrl}
                                alt="Preview"
                                className="w-full h-auto rounded-md object-cover aspect-[4/3]"
                                width={500}
                                height={375}
                            />
                        </motion.div>
                        <motion.div
                            className="w-full flex items-center justify-center gap-4"
                        >
                            <button
                                onClick={handleReset}
                                className="bg-neutral-300 w-full font-bold py-2 px-4 rounded-lg text-zinc-900 hover:bg-neutral-200"
                            >
                                Save
                            </button>   
                            <button
                                onClick={handleReset}
                                className="bg-neutral-300 w-full font-bold py-2 px-4 rounded-lg text-zinc-900 hover:bg-neutral-200"
                            >
                                Retry
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
