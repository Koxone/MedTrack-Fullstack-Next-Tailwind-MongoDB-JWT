export async function createClinicalRecord({ specialty, answers }) {
  try {
    const res = await fetch('/api/clinicalRecords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ specialty, answers }),
    });

    const data = await res.json();

    if (!data.ok) {
      return { ok: false, error: data.error };
    }

    return { ok: true, clinicalRecord: data.clinicalRecord };
  } catch (err) {
    return {
      ok: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Network or server error',
        reason: err.message,
      },
    };
  }
}
