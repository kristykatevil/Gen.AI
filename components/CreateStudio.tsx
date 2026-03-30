"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "text" | "image";

export function CreateStudio() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("text");
  const [projectName, setProjectName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [qualityPreset, setQualityPreset] = useState<"draft" | "standard" | "high">("standard");
  const [outputTarget, setOutputTarget] = useState<"preview" | "printable">("printable");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitText() {
    const response = await fetch("/api/generate/text-to-3d", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectName, prompt, qualityPreset, outputTarget })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Unable to start text generation.");
    router.push(`/app/projects/${data.projectId}`);
  }

  async function submitImage() {
    const form = new FormData();
    form.append("projectName", projectName);
    form.append("qualityPreset", qualityPreset);
    form.append("outputTarget", outputTarget);
    if (imageFile) form.append("image", imageFile);

    const response = await fetch("/api/generate/image-to-3d", { method: "POST", body: form });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Unable to start image generation.");
    router.push(`/app/projects/${data.projectId}`);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "text") await submitText();
      else await submitImage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid grid-2">
      <form className="card" onSubmit={onSubmit}>
        <div className="badge">Generation studio</div>
        <h2 style={{ marginTop: 14 }}>Create a 3D project</h2>
        <p>
          This starter simulates a provider workflow. The async job tracking and result pages are real,
          but the output is a placeholder primitive until you wire up a generation API.
        </p>
        <div className="cta-row" style={{ marginTop: 8 }}>
          <button className={`button ${mode === "text" ? "button-primary" : "button-secondary"}`} type="button" onClick={() => setMode("text")}>Text to 3D</button>
          <button className={`button ${mode === "image" ? "button-primary" : "button-secondary"}`} type="button" onClick={() => setMode("image")}>Image to 3D</button>
        </div>
        <div style={{ marginTop: 18 }}>
          <label className="label">Project name</label>
          <input className="input" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Dragon Medallion" />
        </div>
        {mode === "text" ? (
          <div style={{ marginTop: 16 }}>
            <label className="label">Prompt</label>
            <textarea className="textarea" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Embossed dragon medallion, fantasy style, printable relief" />
          </div>
        ) : (
          <div style={{ marginTop: 16 }}>
            <label className="label">Reference image</label>
            <input className="input" type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] ?? null)} />
          </div>
        )}
        <div className="row" style={{ marginTop: 16 }}>
          <div>
            <label className="label">Quality preset</label>
            <select className="select" value={qualityPreset} onChange={(event) => setQualityPreset(event.target.value as "draft" | "standard" | "high")}>
              <option value="draft">Draft</option>
              <option value="standard">Standard</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="label">Output target</label>
            <select className="select" value={outputTarget} onChange={(event) => setOutputTarget(event.target.value as "preview" | "printable")}>
              <option value="printable">Printable</option>
              <option value="preview">Preview</option>
            </select>
          </div>
        </div>
        {error ? <div className="card" style={{ marginTop: 16, borderRadius: 16, padding: 14 }}><strong>Error:</strong> {error}</div> : null}
        <div className="cta-row" style={{ marginTop: 18 }}>
          <button className="button button-primary" disabled={submitting} type="submit">{submitting ? "Starting..." : "Generate project"}</button>
        </div>
      </form>

      <div className="card">
        <div className="badge">What to replace later</div>
        <div className="kv" style={{ marginTop: 16 }}>
          <div className="kv-row"><span>Storage</span><strong>local files → S3 or Supabase</strong></div>
          <div className="kv-row"><span>Projects DB</span><strong>JSON file → Postgres</strong></div>
          <div className="kv-row"><span>Provider</span><strong>mock → real generation API</strong></div>
          <div className="kv-row"><span>Auth</span><strong>none → Clerk or Supabase Auth</strong></div>
          <div className="kv-row"><span>Billing</span><strong>none → Stripe credits</strong></div>
        </div>
        <div className="card" style={{ marginTop: 18, borderRadius: 18 }}>
          <h3>Fastest demo path</h3>
          <p>
            Start with image-to-3D for maker workflows. It is the easiest path to a compelling first demo
            because users can upload a reference and immediately see a result page and STL export.
          </p>
        </div>
      </div>
    </div>
  );
}
