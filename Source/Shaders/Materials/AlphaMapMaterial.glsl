uniform sampler2D u_texture;
uniform vec2 u_repeat;

agi_material agi_getMaterial(agi_materialInput materialInput)
{
    agi_material material = agi_getDefaultMaterial(materialInput);
    material.alpha = texture2D(u_texture, fract(u_repeat * materialInput.st)).alphaChannel;
    return material;
}