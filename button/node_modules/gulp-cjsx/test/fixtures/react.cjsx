React.createClass
  render: () ->
    <div single-quote-attr='value'
         double-quote-attr="value"
         func-call={ this.props.func(arg1, arg2, () -> 1 + 1) }
         calculated-attr={ this.props['prop-name'] }
         interpolated-attr="CoffeeScript supports #{string.interpolation}"
         invalid-interpolated-attr='CoffeeScript supports #{string.interpolation}'
         func-call={ this.props.func(arg1, arg2) }
         anon-func-call={ (() -> 3)() }
         integers=12345
         decimal=123.45
         negative=-12345
         positive=+12345>
      <div single-quote-attr='value'
           double-quote-attr="value"
           func-call={ this.props.func(arg1, arg2, () -> 1 + 1) }
           calculated-attr={ this.props['prop-name'] }
           interpolated-attr="CoffeeScript supports #{string.interpolation}"
           invalid-interpolated-attr='CoffeeScript supports #{string.interpolation}'
           func-call={ this.props.func(arg1, arg2) }
           anon-func-call={ (() -> 3)() }
           integers=12345
           decimal=123.45
           negative=-12345
           positive=+12345>
        test jsx text &nbsp; &gt;
        { this.props.func(arg1, arg2, () -> 1 + 1) }
        { this.props['prop-name'] }
        { (() -> five = 3)() }
      </div>
      test jsx text &nbsp; &gt;
      { this.props.func(arg1, arg2, () -> 1 + 1) }
      { this.props['prop-name'] }
      { (() -> five = 3)() }
    </div>

  exports
