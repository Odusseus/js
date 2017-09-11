QUnit.test( "Default queen.getColumn() return 0", function( assert ) {

    Svsg.globals.size = 1;
    var queen = new Svsg.queen(0);
    queen.setRandomColumn();
    var column = queen.column;

    assert.ok( column == 1, "Passed!" );
  });

  QUnit.test( "queen.getColumn() and Size is 10 return >= 0 <= 10", function( assert ) {
    
        Svsg.globals.size = 10;
        var queen = new Svsg.queen(0);
        queen.setRandomColumn();
        var column = queen.column;
    
        assert.ok( column >= 1 && column <= 10, "Passed!" );
      });

QUnit.test( "defaut direction", function( assert ) {
  
      var result = new Svsg.direction(Svsg.queenDirectionEnum);
        
      assert.ok( result.currentDirection == Svsg.queenDirectionEnum.UP, "Passed!" );
    });

QUnit.test( "next direction", function( assert ) {
    
        var result = new Svsg.direction(Svsg.queenDirectionEnum);
        result.next();
          
        assert.ok( result.currentDirection == Svsg.queenDirectionEnum.UPRIGHT, "Passed!" );
      });

QUnit.test( "field id is 1 when col = 1 en line = 1", function( assert ) {
        
    var field = new Svsg.field(1, 1);              
    assert.ok( field.id == 1, "Passed!" );
});

QUnit.test( "field id is 15  when col = 5 en line = 2", function( assert ) {
    
    Svsg.globals.size = 10;          
    var field = new Svsg.field(5, 2);
    assert.ok( field.id == 15, "Passed!" );
});

QUnit.test( "field id is 100  when col = 10 en line = 10", function( assert ) {
    
    Svsg.globals.size = 10;          
    var field = new Svsg.field(10, 10);
    assert.ok( field.id == 100, "Passed!" );
});

QUnit.test( "up", function( assert ) {
  
    Svsg.globals.size = 10;
    var queen = new Svsg.queen(1);
    queen.line = 1;
    queen.column = 1;
    var fields = queen.getUpFields();
      
    for(var i = 0; i < Svsg.globals.size - 2; i++){
        assert.ok( fields[i].column == 1 && fields[i].line == i + 2, "Passed!" );
    }
});

QUnit.test( "up line 10", function( assert ) {  
    Svsg.globals.size = 10;
    var queen = new Svsg.queen(1);
    queen.column = 1;
    queen.line = 10;
    var fields = queen.getUpFields();     
    assert.ok( fields.length == 0, "Passed!" );
});

QUnit.test( "Down 10", function( assert ) {
    
      Svsg.globals.size = 10;
      var queen = new Svsg.queen(1);
      queen.column = 1;
      queen.line = 10;
      var fields = queen.getDownFields();
        
      for(var i = 0; i < Svsg.globals.size - 2; i++){
          assert.ok( fields[i].column == 1 && fields[i].line == queen.line - i - 1, "Passed!" );
      }
  });
  
  QUnit.test( "Downe line", function( assert ) {  
      Svsg.globals.size = 10;
      var queen = new Svsg.queen(1);
      queen.column = 1;
      queen.line = 1;
      var fields = queen.getDownFields();     
      assert.ok( fields.length == 0, "Passed!" );
  });

  QUnit.test( "right 1 1", function( assert ) {
    
      Svsg.globals.size = 10;
      var queen = new Svsg.queen(1);
      queen.column = 1;
      queen.line = 1;
      var fields = queen.getRightFields();
        
      for(var i = 0; i < Svsg.globals.size - 2; i++){
          assert.ok( fields[i].column == i + 2 && fields[i].line == 1, "Passed!" );
      }
  });

  QUnit.test( "right 10 1", function( assert ) {
    
      Svsg.globals.size = 10;
      var queen = new Svsg.queen(1);
      queen.column = 10;
      queen.line = 1;
      var fields = queen.getRightFields();
        
      assert.ok( fields.length == 0, "Passed!" );
  });

  QUnit.test( "left 10 1", function( assert ) {
    
      Svsg.globals.size = 10;
      var queen = new Svsg.queen(1);
      queen.column = 10;
      queen.line = 1;
      var fields = queen.getLeftFields();
        
      for(var i = 0; i < Svsg.globals.size - 2; i++){
          assert.ok( fields[i].column == queen.column - i - 1 && fields[i].line == 1, "Passed!" );
      }
  });

  QUnit.test( "left 1 1", function( assert ) {
    
      Svsg.globals.size = 10;
      var queen = new Svsg.queen(1);
      queen.column = 1;
      queen.line = 1;
      var fields = queen.getLeftFields();
        
      assert.ok( fields.length == 0, "Passed!" );
  });