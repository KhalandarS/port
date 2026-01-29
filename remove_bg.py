import sys
import os

try:
    from rembg import remove
    from PIL import Image
    import io
except ImportError as e:
    print(f"Error importing modules: {e}")
    print("Installing rembg and pillow...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "pillow", "onnxruntime"])
    from rembg import remove
    from PIL import Image
    import io

input_path = r"C:\Users\USER\.gemini\antigravity\brain\1ca64a6e-446b-43c8-817b-311506dca950\uploaded_media_1769670097221.png"
output_path = r"c:\Users\USER\Desktop\port\public\profile_v4_python.png"

print(f"Processing {input_path}...")

with open(input_path, 'rb') as i:
    input_data = i.read()
    output_data = remove(input_data)
    
    with open(output_path, 'wb') as o:
        o.write(output_data)

print(f"Saved to {output_path}")
print("Done.")
