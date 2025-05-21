"use client";

import { useState, useRef } from "react";
import { useRouter, redirect } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Upload, X, Music, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

// Valid genres
const genres = [
  "Kompa", "Rasin", "Twoubadou", "Zouk", "Rap Kreyòl", "Rara", "Carnival", "Gospel", "Jazz"
];

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect non-artists to dashboard
  if (user && !user.isArtist) {
    redirect("/dashboard");
  }

  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [, setCoverImage] = useState<File | null>(null); // coverImage state seems unused for its value, only set
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [featuring, setFeaturing] = useState("");
  const [isExplicit, setIsExplicit] = useState(false);
  const [isOriginal, setIsOriginal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type?.startsWith('audio/')) {
      setFile(selectedFile);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type?.startsWith('image/')) {
      setCoverImage(selectedFile); // Keep this if you plan to use the File object later (e.g., for upload)
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.type?.startsWith('audio/')) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.push('/artist-portal'); // Redirect to artist portal or a success page
  };

  const goToNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">Upload New Track</h1>
          <p className="text-white/70 mt-1">Share your music with the world</p>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0"></div>
            <StepIndicator number={1} title="Upload File" isActive={step === 1} isComplete={step > 1} />
            <StepIndicator number={2} title="Track Details" isActive={step === 2} isComplete={step > 2} />
            <StepIndicator number={3} title="Review & Submit" isActive={step === 3} isComplete={false} /> {/* isComplete for step 3 will be true upon successful upload */}
          </div>

          {/* Step 1: File Upload */}
          {step === 1 && (
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center bg-white/5 cursor-pointer hover:border-haiti-gold transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Drop audio file here or click to browse"
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click();
                  }
                }}
              >
                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-haiti-gold/20 rounded-full flex items-center justify-center text-haiti-gold mb-4">
                      <Music className="h-8 w-8" />
                    </div>
                    <h3 className="text-white font-medium text-lg mb-1">{file.name}</h3>
                    <p className="text-white/70 text-sm mb-4">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type}
                    </p>
                    <button
                      className="text-haiti-red hover:text-red-500 flex items-center gap-2 text-sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent div's onClick
                        setFile(null);
                        if(fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
                      }}
                      type="button"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white/70 mb-4">
                      <Upload className="h-8 w-8" />
                    </div>
                    <h3 className="text-white font-medium text-lg mb-1">Drag & drop your audio file</h3>
                    <p className="text-white/70 text-sm mb-4">or click to browse your files</p>
                    <span // Changed button to span to avoid nested interactive elements if parent is clickable
                      className="bg-haiti-gold text-haiti-blue px-4 py-2 rounded-lg font-medium inline-block"
                      role="button" // For accessibility, though parent div handles click
                      tabIndex={-1} // Not focusable itself, parent is
                    >
                      Browse Files
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="audio/*"
                      onChange={handleFileChange}
                      title="Audio file input"
                      placeholder="Select audio file"
                    />
                  </div>
                )}
              </div>
              
              <div className="text-white/70 text-sm">
                <h4 className="font-medium text-white mb-2">Supported Formats:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>MP3 (recommended)</li>
                  <li>WAV</li>
                  <li>FLAC</li>
                  <li>AAC</li>
                </ul>
                <p className="mt-4">
                  Max file size: 50 MB. Higher quality audio files will provide a better listening experience.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="bg-haiti-gold text-haiti-blue px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={goToNextStep}
                  disabled={!file}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Track Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label htmlFor="track-title" className="block text-white text-sm font-medium mb-2">Track Title *</label>
                    <input
                      id="track-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haiti-gold focus:border-transparent"
                      placeholder="Enter track title"
                      required
                      title="Track title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="genre-select" className="block text-white text-sm font-medium mb-2">Genre * (Select at least one)</label>
                    <div id="genre-select" className="flex flex-wrap gap-2">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedGenres.includes(genre)
                              ? 'bg-haiti-gold text-haiti-blue'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                          type="button"
                          aria-pressed={selectedGenres.includes(genre)}
                          title={genre}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="release-date" className="block text-white text-sm font-medium mb-2">Release Date</label>
                    <input
                      id="release-date"
                      type="date"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haiti-gold focus:border-transparent"
                      title="Release date"
                      placeholder="Select release date"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="featuring" className="block text-white text-sm font-medium mb-2">Featured Artists (Optional)</label>
                    <input
                      id="featuring"
                      type="text"
                      value={featuring}
                      onChange={(e) => setFeaturing(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haiti-gold focus:border-transparent"
                      placeholder="e.g., Artist Name, Another Artist"
                      title="Featured artists"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cover-art-button" className="block text-white text-sm font-medium mb-2">Cover Art (Optional)</label>
                  <div
                    id="cover-art-container" // Changed id to avoid conflict with input
                    className="border-2 border-dashed border-white/20 rounded-lg p-3 text-center bg-white/5 aspect-square cursor-pointer hover:border-haiti-gold transition-colors"
                    onClick={() => coverInputRef.current?.click()}
                    tabIndex={0}
                    role="button"
                    aria-label="Add or change cover art"
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        coverInputRef.current?.click();
                      }
                    }}
                  >
                    {coverPreview ? (
                      <div className="relative h-full w-full">
                        <Image 
                          src={coverPreview} 
                          alt="Cover art preview" 
                          layout="fill" // Use fill for aspect ratio container
                          objectFit="cover" // Ensure image covers the area
                          className="rounded-md" 
                        />
                        <button
                          className="absolute top-1 right-1 bg-haiti-red/80 text-white rounded-full p-1 hover:bg-haiti-red transition-colors"
                          onClick={e => {
                            e.stopPropagation(); // Prevent triggering parent div's onClick
                            setCoverImage(null);
                            setCoverPreview(null);
                            if(coverInputRef.current) coverInputRef.current.value = ""; // Reset file input
                          }}
                          type="button"
                          title="Remove cover art"
                          aria-label="Remove cover art"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Plus className="h-8 w-8 text-white/50 mb-2" />
                        <span className="text-white/70 text-sm">Click to add cover art</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="cover-art-input" // Changed id
                      ref={coverInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverChange}
                      title="Cover art file input"
                      placeholder="Select cover art"
                    />
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    Recommended: Square image, JPG or PNG. Min 1400x1400 pixels.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 pt-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="explicit" 
                    checked={isExplicit}
                    onChange={(e) => setIsExplicit(e.target.checked)}
                    className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold rounded border-white/30 bg-white/10" 
                  />
                  <label htmlFor="explicit" className="ml-2 text-white text-sm">
                    Explicit Content
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="original" 
                    checked={isOriginal}
                    onChange={(e) => setIsOriginal(e.target.checked)}
                    className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold rounded border-white/30 bg-white/10" 
                  />
                  <label htmlFor="original" className="ml-2 text-white text-sm">
                    This is an original track (you own all rights)
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  onClick={goToPreviousStep}
                >
                  Back
                </button>
                
                <button
                  className="bg-haiti-gold text-haiti-blue px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={goToNextStep}
                  disabled={!title || selectedGenres.length === 0}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium text-lg mb-4">Review Your Submission</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <ReviewItem label="File" value={file?.name || "N/A"} isTruncated={true} />
                    <ReviewItem label="Title" value={title} />
                    <ReviewItem label="Genre(s)" value={selectedGenres.join(", ")} />
                    {releaseDate && <ReviewItem label="Release Date" value={releaseDate} />}
                    {featuring && <ReviewItem label="Featuring" value={featuring} />}
                    <ReviewItem label="Explicit" value={isExplicit ? "Yes" : "No"} />
                    <ReviewItem label="Original" value={isOriginal ? "Yes" : "No"} />
                  </div>
                  
                  <div className="flex justify-center items-center">
                    {coverPreview ? (
                      <div className="w-40 h-40 relative">
                        <Image 
                          src={coverPreview} 
                          alt="Cover Preview" 
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 bg-white/5 rounded-md flex items-center justify-center border border-white/10">
                        <Music className="h-10 w-10 text-white/30" />
                        <span className="sr-only">No cover art provided</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-haiti-blue/30 border border-haiti-blue/50 rounded-lg p-4 text-white/90 text-sm">
                <p>
                  By uploading, you confirm that your tracks comply with our Terms of Service and that you have all necessary rights to the content. Please ensure your music does not infringe on any copyrights.
                </p>
              </div>
              
              <div className="flex justify-between">
                <button
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  onClick={goToPreviousStep}
                  disabled={isLoading}
                >
                  Back
                </button>
                
                <button
                  className="bg-haiti-gold text-haiti-blue px-8 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleUpload}
                  disabled={isLoading || !file || !title || selectedGenres.length === 0}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-haiti-blue/50 border-t-haiti-blue rounded-full" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Upload Track</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  readonly number: number;
  readonly title: string;
  readonly isActive: boolean;
  readonly isComplete: boolean;
}

function StepIndicator({ number, title, isActive, isComplete }: StepIndicatorProps) {
  let indicatorClass = '';
  if (isComplete) {
    indicatorClass = 'bg-haiti-gold text-haiti-blue';
  } else if (isActive) {
    indicatorClass = 'bg-white text-haiti-blue'; // Active step
  } else {
    indicatorClass = 'bg-white/10 text-white/70'; // Pending step
  }
  return (
    <div className="flex flex-col items-center relative z-10">
      <motion.div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${indicatorClass}`}
        initial={false} // Prevent initial animation if not desired
        animate={{
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive ? '0 0 0 4px rgba(255,199,44,0.3)' : 'none' // Haiti Gold with opacity
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isComplete ? <Check className="h-5 w-5" /> : number}
      </motion.div>
      <span className={`mt-2 text-xs sm:text-sm text-center ${isActive || isComplete ? 'text-white font-medium' : 'text-white/70'}`}>
        {title}
      </span>
    </div>
  );
}

interface ReviewItemProps {
  label: string;
  value: string;
  isTruncated?: boolean;
}

function ReviewItem({ label, value, isTruncated = false }: ReviewItemProps) {
  return (
    <div className="flex">
      <div className="w-28 text-white/70 text-sm">{label}:</div>
      <div className={`text-white text-sm ${isTruncated ? 'truncate' : ''} flex-1`}>{value}</div>
    </div>
  );
}
