import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: File
    accept?: string
    className?: string
}

export function FileUpload({ onChange, value, accept, className }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false)

    return (
        <Label
            htmlFor="picture"
            className={cn(
                "relative flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 px-6 py-8 hover:border-primary transition-colors",
                isDragging && "border-primary",
                value && "border-primary bg-primary/5",
                className
            )}
            onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                const file = e.dataTransfer.files[0]
                if (file) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.files = dataTransfer.files;
                    const event = new Event('change', { bubbles: true });
                    input.dispatchEvent(event);
                    onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
                }
            }}
        >
            <div className="space-y-2 text-center">
                <Upload className={cn(
                    "mx-auto h-6 w-6 text-muted-foreground",
                    value && "text-primary"
                )} />
                <div className="text-sm text-muted-foreground">
                    {value ? (
                        <span className="text-primary font-medium">
                            {value.name}
                        </span>
                    ) : (
                        "Drop your image here or click to upload"
                    )}
                </div>
                <div className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP (max. 2MB)
                </div>
            </div>
            <Input
                id="picture"
                type="file"
                accept={accept}
                className="sr-only"
                onChange={onChange}
            />
        </Label>
    )
}