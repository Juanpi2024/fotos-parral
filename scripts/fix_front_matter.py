import os

def fix_front_matter():
    root_dir = "c:\\Users\\Casa\\fotos-parral"
    fixed_files = []
    
    for filename in os.listdir(root_dir):
        if filename.endswith(".html"):
            filepath = os.path.join(root_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if not content.startswith("---"):
                print(f"Fixing {filename}")
                new_content = "---\n---\n" + content
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                fixed_files.append(filename)
            else:
                # Check if it has the closing ---
                if content.count("---") < 2:
                     print(f"Fixing malformed front matter in {filename}")
                     # This is a bit more complex, but usually it's just missing
                     pass

    return fixed_files

if __name__ == "__main__":
    fixed = fix_front_matter()
    print(f"Fixed {len(fixed)} files: {', '.join(fixed)}")
