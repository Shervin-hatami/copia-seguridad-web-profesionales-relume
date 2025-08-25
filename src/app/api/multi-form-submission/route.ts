import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form, submissionData } = body;

    // Por ahora, solo logueamos los datos y devolvemos éxito
    console.log('Form submission received:', {
      form,
      submissionData,
      timestamp: new Date().toISOString()
    });

    // Aquí podrías guardar los datos en una base de datos, enviar un email, etc.
    // Por ahora solo simulamos un procesamiento exitoso

    return NextResponse.json({ 
      success: true, 
      message: 'Formulario enviado exitosamente',
      data: {
        form,
        submissionData,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al procesar el formulario' 
      },
      { status: 500 }
    );
  }
}
