"use client";

import { Smartphone, Laptop, Headphones, Keyboard, Cpu, Microchip, ChevronDown, Mouse } from "lucide-react";
import { useState } from "react";

export const TechGear = () => {
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);

  const toggleDevice = (device: string) => {
    setExpandedDevice(expandedDevice === device ? null : device);
  };

  return (
    <div className="p-0">
      <div className="space-y-2">
        <h3 className="px-5 py-3 text-sm font-medium text-muted-foreground">Devices</h3>
        <div className="grid">
          <button 
            onClick={() => toggleDevice('phone')}
            className="flex items-center justify-between w-full px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted/50">
                <Smartphone className="size-4 text-muted-foreground" />
              </div>
              <div>
               <p className="font-medium">
                <a
                  href="https://www.samsung.com/ph/smartphones/galaxy-s24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Samsung Galaxy S24 5G
                </a>
               </p>
              </div>
            </div>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform ${expandedDevice === 'phone' ? 'rotate-180' : ''}`} />
          </button>
          {expandedDevice === 'phone' && (
            <div className="px-5 py-3 border-b border-border bg-muted/5">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Processor</span>
                  <span>Samsung Exynos 2400</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">RAM</span>
                  <span>8GB LPDDR5X</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage</span>
                  <span>256GB UFS 4.0</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Display</span>
                  <span>6.2&quot; LTPO FHD+ 120Hz</span>
                </li>
              </ul>
            </div>
          )}

          <button 
            onClick={() => toggleDevice('pc')}
            className="flex items-center justify-between w-full px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted/50">
                <Cpu className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Gaming Specifications</p>
              </div>
            </div>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform ${expandedDevice === 'pc' ? 'rotate-180' : ''}`} />
          </button>
          {expandedDevice === 'pc' && (
            <div className="px-5 py-3 border-b border-border bg-muted/5">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">CPU</span>
                  <span>AMD Ryzen 7 5600 (8C + 16T)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">GPU</span>
                  <span>NVIDIA RTX 3090 8GB GDDR5</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">RAM</span>
                  <span>32GB DDR5 XMP</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage</span>
                  <span>Kingston NVME3 1TB</span>
                </li>
              </ul>
            </div>
          )}

          <button 
            onClick={() => toggleDevice('server')}
            className="flex items-center justify-between w-full px-5 py-3 hover:bg-muted/50 transition-colors border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted/50">
                <Laptop className="size-4 text-muted-foreground" />
              </div>
              <div>
              <p className="font-medium">
                <a
                  href="https://www.lenovo.com/ph/en/p/laptops/ideapad/ideapad-3/ideapad-slim-3-gen-8-15-inch-amd/len101i0073"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Lenovo Ideapad Slim 3 (8th)
                </a>
              </p>
              </div>
            </div>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform ${expandedDevice === 'server' ? 'rotate-180' : ''}`} />
          </button>
          {expandedDevice === 'server' && (
            <div className="px-5 py-3 border-b border-border bg-muted/5">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">CPU</span>
                  <span>AMD Ryzen™ 5 7520U</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">RAM</span>
                  <span>16 GB LPDDR5-5500MHz</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage</span>
                  <span>Samsung NVME2 512GB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">OS</span>
                  <span>Ubuntu Server 22.04 LTS</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="px-5 py-3 text-sm font-medium text-muted-foreground">Kits</h3>
        <div className="grid">
          <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="p-2 rounded-md bg-muted/50">
              <Headphones className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">
                <a
                  href="https://truthear.com/products/zero-red"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Truthear x Crincale ZERO: RED
                </a>
              </p>
              <p className="text-sm text-muted-foreground">TRN T2 16 Core, Kinera Celest Ruyi Pro</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="p-2 rounded-md bg-muted/50">
              <Microchip className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">
                <a
                  href="https://trn-audio.com/trn-black-pearl.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  TRN Black Pearl
                </a>
              </p>
              <p className="text-sm text-muted-foreground">C43131 DAC, CB5100 Amplifier + 8-Band EQ</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="p-2 rounded-md bg-muted/50">
              <Mouse className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">
                <a
                  href="https://www.pulsar.gg/products/tenz-signature-edition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Pulsar&apos;s TenZ Signature Edition
                </a>
              </p>
              <p className="text-sm text-muted-foreground">XS-1 Sensor, 32,000 DPI, 8K PR</p>
            </div>
          </div>          
          <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-border">
            <div className="p-2 rounded-md bg-muted/50">
              <Keyboard className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">
                <a
                  href="https://www.aulastar.com/gaming-keyboard/176.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Aula F75
                </a>
              </p>
              <p className="text-sm text-muted-foreground">75% Wireless Gasket Mounted Keyboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 