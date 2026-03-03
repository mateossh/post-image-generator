'use client'

import { Dropzone } from "@/components/dropzone";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Download, ScanEye } from 'lucide-react';

export function Configurator() {
  return (
    <section className="py-4 space-y-2">
      <div>
        <Label htmlFor="post-bg" className="pb-1">Background</Label>
        <Dropzone
          onDrop={() => console.log('nothing')}
          onClick={() => console.log('nothing 2')}
        />
      </div>
      <div>
        <Label htmlFor="post-text" className="pb-1">Main content</Label>
        <Textarea className="bg-white" id="post-text" placeholder="lorem ipsum dolor sit amet..." />
      </div>


      <div className="flex justify-center space-x-4 py-6">
        <Button variant="secondary">
          <ScanEye />
          Preview
        </Button>
        <Button >
          <Download />
          Download
        </Button>
      </div>
    </section>
  )
}
