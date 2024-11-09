"use client";
import { FileUpload } from "@/components/ui/file-upload";

export default function Test() {
    return (
        <div className="min-h-screen items-center justify-center">
            <div className="h-[500px] aspect-square">
                <FileUpload/>
            </div>
        </div>
    );
}