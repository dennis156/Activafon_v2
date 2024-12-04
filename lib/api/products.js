export async function agregarProducto(producto) {
    try {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al agregar producto");
        }

        return res.json();
    } catch (error) {
        console.error("Error en agregarProducto:", error);
        throw error;
    }
}