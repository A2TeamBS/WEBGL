function initBuffers(gl) {
  const positions = [
    // Coordonnées des sommets du carré
    1.0,  1.0,
    -1.0,  1.0,
    1.0, -1.0,
    -1.0, -1.0,
  ];

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colors = [
    1.0,  1.0,  1.0,  1.0,    // blanc
    1.0,  0.0,  0.0,  1.0,    // rouge
    0.0,  1.0,  0.0,  1.0,    // vert
    0.0,  0.0,  1.0,  1.0,    // bleu
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}
