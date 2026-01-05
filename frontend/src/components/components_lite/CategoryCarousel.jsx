import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { Layout, Database, BarChart, Globe, Code, Smartphone, ShieldCheck, Cpu } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Frontend", icon: <Layout /> },
  { name: "Backend", icon: <Database /> },
  { name: "Data Science", icon: <BarChart /> },
  { name: "Designer", icon: <Globe /> },
  { name: "Fullstack", icon: <Code /> },
  { name: "Mobile", icon: <Smartphone /> },
  { name: "Security", icon: <ShieldCheck /> },
  { name: "DevOps", icon: <Cpu /> },
];

const CategoryCarousel = () => {
  const navigate = useNavigate(); // 2. Initialize navigate hook

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-24 md:-mt-32">
      <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        <h2 className="text-white text-xl font-bold mb-8 ml-2">
          Explore by <span className="text-red-500">Category</span>
        </h2>
        
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {categories.map((cat, i) => (
              <CarouselItem key={i} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                {/* 3. Add onClick to navigate to /jobs */}
                <Button 
                  onClick={() => navigate('/jobs')}
                  variant="ghost" 
                  className="w-full h-32 flex flex-col gap-4 bg-white/5 border border-white/5 hover:border-violet-500/50 hover:bg-zinc-900 rounded-3xl transition-all group"
                >
                  <div className="p-3 rounded-2xl bg-black text-violet-500 group-hover:text-red-500 transition-colors">
                    {React.cloneElement(cat.icon, { size: 24 })}
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium">{cat.name}</span>
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-6 bg-zinc-900 border-white/10 text-white" />
          <CarouselNext className="hidden md:flex -right-6 bg-zinc-900 border-white/10 text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;