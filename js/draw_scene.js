var squareRotation = 0.0;

function drawScene(gl, programInfo, buffers, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Efface en noir, complètement opaque
  gl.clearDepth(1.0);                 // Tout effacer
  gl.enable(gl.DEPTH_TEST);           // Activer le test de profondeur
  gl.depthFunc(gl.LEQUAL);            // Les objets les plus proches cachent les objets lointains

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180;   // en radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);  // déplacement

  // Appliquer la rotation du carré
  mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation, [0, 0, 1]);

  {
    const numComponents = 2;  // tirer 2 valeurs par itération
    const type = gl.FLOAT;    // les données dans le tampon sont des flottants 32 bits
    const normalize = false;  // ne pas normaliser
    const stride = 0;         // combien d'octets à récupérer d'un jeu de valeurs à l'autre
    const offset = 0;         // décalage dans le tampon
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }

  // Mettre à jour la rotation du carré pour l'animation
  squareRotation += deltaTime;
}

var then = 0;

function render(now) {
  now *= 0.001;  // convertir en secondes
  const deltaTime = now - then;
  then = now;

  drawScene(gl, programInfo, buffers, deltaTime);

  requestAnimationFrame(render);
}
