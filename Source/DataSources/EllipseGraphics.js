/*global define*/
define([
        '../Core/defaultValue',
        '../Core/defined',
        '../Core/defineProperties',
        '../Core/DeveloperError',
        '../Core/Event',
        './PropertyHelper'
    ], function(
        defaultValue,
        defined,
        defineProperties,
        DeveloperError,
        Event,
        PropertyHelper) {
    "use strict";

    /**
     * An optionally time-dynamic ellipse.
     *
     * @alias EllipseGraphics
     * @constructor
     */
    var EllipseGraphics = function(options) {
        this._semiMajorAxis = undefined;
        this._semiMajorAxisSubscription = undefined;
        this._semiMinorAxis = undefined;
        this._semiMinorAxisSubscription = undefined;
        this._rotation = undefined;
        this._rotationSubscription = undefined;
        this._show = undefined;
        this._showSubscription = undefined;
        this._material = undefined;
        this._materialSubscription = undefined;
        this._height = undefined;
        this._heightSubscription = undefined;
        this._extrudedHeight = undefined;
        this._extrudedHeightSubscription = undefined;
        this._granularity = undefined;
        this._granularitySubscription = undefined;
        this._stRotation = undefined;
        this._stRotationSubscription = undefined;
        this._fill = undefined;
        this._fillSubscription = undefined;
        this._outline = undefined;
        this._outlineSubscription = undefined;
        this._outlineColor = undefined;
        this._outlineColorSubscription = undefined;
        this._outlineWidth = undefined;
        this._outlineWidthSubscription = undefined;
        this._numberOfVerticalLines = undefined;
        this._numberOfVerticalLinesSubscription = undefined;
        this._definitionChanged = new Event();

        this.merge(defaultValue(options, defaultValue.EMPTY_OBJECT));
    };

    defineProperties(EllipseGraphics.prototype, {
        /**
         * Gets the event that is raised whenever a new property is assigned.
         * @memberof EllipseGraphics.prototype
         *
         * @type {Event}
         * @readonly
         */
        definitionChanged : {
            get : function() {
                return this._definitionChanged;
            }
        },

        /**
         * Gets or sets the numeric {@link Property} specifying the ellipse's semi-major-axis.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        semiMajorAxis : PropertyHelper.createPropertyDescriptor('semiMajorAxis'),

        /**
         * Gets or sets the numeric {@link Property} specifying the ellipse's semi-minor-axis.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        semiMinorAxis : PropertyHelper.createPropertyDescriptor('semiMinorAxis'),

        /**
         * Gets or sets the numeric {@link Property} specifying the ellipse's rotation.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        rotation : PropertyHelper.createPropertyDescriptor('rotation'),

        /**
         * Gets or sets the boolean {@link Property} specifying the polygon's visibility.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        show : PropertyHelper.createPropertyDescriptor('show'),

        /**
         * Gets or sets the {@link MaterialProperty} specifying the appearance of the polygon.
         * @memberof EllipseGraphics.prototype
         * @type {MaterialProperty}
         */
        material : PropertyHelper.createMaterialPropertyDescriptor('material'),

        /**
         * Gets or sets the Number {@link Property} specifying the height of the polygon.
         * If undefined, the polygon will be on the surface.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        height : PropertyHelper.createPropertyDescriptor('height'),

        /**
         * Gets or sets the Number {@link Property} specifying the extruded height of the polygon.
         * Setting this property creates a polygon shaped volume starting at height and ending
         * at the extruded height.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        extrudedHeight : PropertyHelper.createPropertyDescriptor('extrudedHeight'),

        /**
         * Gets or sets the Number {@link Property} specifying the sampling distance, in radians,
         * between each latitude and longitude point.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        granularity : PropertyHelper.createPropertyDescriptor('granularity'),

        /**
         * Gets or sets the Number {@link Property} specifying the rotation of the texture coordinates,
         * in radians. A positive rotation is counter-clockwise.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        stRotation : PropertyHelper.createPropertyDescriptor('stRotation'),

        /**
         * Gets or sets the Boolean {@link Property} specifying whether the ellipse should be filled.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        fill : PropertyHelper.createPropertyDescriptor('fill'),

        /**
         * Gets or sets the Boolean {@link Property} specifying whether the ellipse should be outlined.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        outline : PropertyHelper.createPropertyDescriptor('outline'),

        /**
         * Gets or sets the Color {@link Property} specifying the color of the outline.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        outlineColor : PropertyHelper.createPropertyDescriptor('outlineColor'),

        /**
         * Gets or sets the Number {@link Property} specifying the width of the outline.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        outlineWidth : PropertyHelper.createPropertyDescriptor('outlineWidth'),

        /**
         * Gets or sets the Number {@link Property} specifying the number of vertical lines
         * to use when outlining the ellipse.
         * @memberof EllipseGraphics.prototype
         * @type {Property}
         */
        numberOfVerticalLines : PropertyHelper.createPropertyDescriptor('numberOfVerticalLines')
    });

    /**
     * Duplicates a EllipseGraphics instance.
     *
     * @param {EllipseGraphics} [result] The object onto which to store the result.
     * @returns {EllipseGraphics} The modified result parameter or a new instance if one was not provided.
     */
    EllipseGraphics.prototype.clone = function(result) {
        if (!defined(result)) {
            result = new EllipseGraphics();
        }
        result.rotation = this.rotation;
        result.semiMajorAxis = this.semiMajorAxis;
        result.semiMinorAxis = this.semiMinorAxis;
        result.show = this.show;
        result.material = this.material;
        result.height = this.height;
        result.extrudedHeight = this.extrudedHeight;
        result.granularity = this.granularity;
        result.stRotation = this.stRotation;
        result.fill = this.fill;
        result.outline = this.outline;
        result.outlineColor = this.outlineColor;
        result.outlineWidth = this.outlineWidth;
        result.numberOfVerticalLines = this.numberOfVerticalLines;
        return result;
    };

    /**
     * Assigns each unassigned property on this object to the value
     * of the same property on the provided source object.
     *
     * @param {EllipseGraphics} source The object to be merged into this object.
     */
    EllipseGraphics.prototype.merge = function(source) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(source)) {
            throw new DeveloperError('source is required.');
        }
        //>>includeEnd('debug');

        this.rotation = defaultValue(this.rotation, source.rotation);
        this.semiMajorAxis = defaultValue(this.semiMajorAxis, source.semiMajorAxis);
        this.semiMinorAxis = defaultValue(this.semiMinorAxis, source.semiMinorAxis);
        this.show = defaultValue(this.show, source.show);
        this.material = defaultValue(this.material, source.material);
        this.height = defaultValue(this.height, source.height);
        this.extrudedHeight = defaultValue(this.extrudedHeight, source.extrudedHeight);
        this.granularity = defaultValue(this.granularity, source.granularity);
        this.stRotation = defaultValue(this.stRotation, source.stRotation);
        this.fill = defaultValue(this.fill, source.fill);
        this.outline = defaultValue(this.outline, source.outline);
        this.outlineColor = defaultValue(this.outlineColor, source.outlineColor);
        this.outlineWidth = defaultValue(this.outlineWidth, source.outlineWidth);
        this.numberOfVerticalLines = defaultValue(this.numberOfVerticalLines, source.numberOfVerticalLines);
    };

    return EllipseGraphics;
});
