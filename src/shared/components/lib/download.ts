export async function downloadFromApiUrl(
    url: string,
    filename = "reporte",
    token?: string,
    options?: { method?: "GET" | "POST", body?: any }
) {
    const method = options?.method ?? "GET";
    const headers: Record<string, string> = {};

    // Si envías JSON en POST
    if (method === "POST") {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const resp = await fetch(url, {
        method,
        headers,
        body: method === "POST" && options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!resp.ok) {
        const text = await resp.text().catch(() => null);
        throw new Error(`Error al obtener el reporte: ${resp.status} ${text ?? ""}`);
    }

    const blob = await resp.blob();

    // Intentar leer filename desde content-disposition
    const cd = resp.headers.get("content-disposition") || "";
    const m = cd.match(/filename\*?=(?:UTF-8'')?\"?([^\";]+)/);
    const ext = guessExtensionFromBlob(blob);
    const finalName = m ? decodeURIComponent(m[1]) : `${filename}.${ext}`;

    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = finalName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(urlBlob);
}

function guessExtensionFromBlob(blob: Blob) {
    const t = blob.type || "";
    if (t.includes("csv")) return "csv";
    if (t.includes("excel") || t.includes("spreadsheet") || t.includes("vnd.ms-excel")) return "xlsx";
    if (t.includes("pdf")) return "pdf";
    return "bin";
}
