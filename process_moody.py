import sys
from rembg import remove
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import numpy as np

def process_image():
    input_path = r"C:\Users\USER\.gemini\antigravity\brain\1ca64a6e-446b-43c8-817b-311506dca950\uploaded_media_1769670097221.png"
    output_path = r"c:\Users\USER\Desktop\port\public\profile_moody.png"
    
    print(f"Processing {input_path}...")
    
    # 1. Load Original
    img = Image.open(input_path)
    
    # 2. Remove Background
    # Using alpha_matting for softer edges
    img_no_bg = remove(img, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10, alpha_matting_erode_size=10)
    
    # 3. Convert to Grayscale (B&W)
    # We convert to 'L' to get grayscale values, then put it back into 'RGBA' to keep alpha
    r, g, b, a = img_no_bg.split()
    grayscale = ImageOps.grayscale(img_no_bg)
    grayscale = grayscale.convert("RGB")
    r_gray, g_gray, b_gray = grayscale.split()
    
    # Recombine with original alpha
    final_img = Image.merge("RGBA", (r_gray, g_gray, b_gray, a))
    
    # 4. Enhance Contrast for "Moody" look
    enhancer = ImageEnhance.Contrast(final_img)
    final_img = enhancer.enhance(1.2) # Increase contrast slightly
    
    # 5. Save
    final_img.save(output_path)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    process_image()
